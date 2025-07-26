;; Course Badge Passport Contract
;; A single NFT that collects and tracks all course completions for each user

;; Define the NFT
(define-non-fungible-token course-passport uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-passport-owner (err u101))
(define-constant err-passport-not-found (err u102))
(define-constant err-course-already-completed (err u103))
(define-constant err-invalid-course-id (err u104))

;; Data Variables
(define-data-var next-passport-id uint u1)
(define-data-var total-courses uint u0)

;; Maps
;; Track which user owns which passport
(define-map user-passports principal uint)
;; Track completed courses for each passport
(define-map passport-courses uint (list 50 uint))
;; Track course metadata
(define-map course-info uint {name: (string-ascii 50), issuer: (string-ascii 50), completion-date: uint})

;; Issue a new passport to a user (or get existing one)
(define-public (get-or-create-passport)
  (let ((existing-passport (map-get? user-passports tx-sender)))
    (match existing-passport
      passport-id (ok passport-id)
      (let ((new-passport-id (var-get next-passport-id)))
        (try! (nft-mint? course-passport new-passport-id tx-sender))
        (map-set user-passports tx-sender new-passport-id)
        (map-set passport-courses new-passport-id (list))
        (var-set next-passport-id (+ new-passport-id u1))
        (ok new-passport-id)))))

;; Add a completed course to user's passport
(define-public (add-course-completion (course-id uint) (course-name (string-ascii 50)) (issuer (string-ascii 50)))
  (begin
    (asserts! (> course-id u0) err-invalid-course-id)
    (let ((passport-id-result (get-or-create-passport)))
      (match passport-id-result
        passport-id
        (let ((current-courses (default-to (list) (map-get? passport-courses passport-id))))
          ;; Check if course already completed
          (asserts! (is-none (index-of current-courses course-id)) err-course-already-completed)
          ;; Add course to passport
          (let ((updated-courses (unwrap! (as-max-len? (append current-courses course-id) u50) err-invalid-course-id)))
            (map-set passport-courses passport-id updated-courses)
            (map-set course-info course-id {
              name: course-name,
              issuer: issuer,
              completion-date: stacks-block-height
            })
            (var-set total-courses (+ (var-get total-courses) u1))
            (ok passport-id)))
        error-code (err error-code)))))

;; Read-only functions

;; Get user's passport ID
(define-read-only (get-user-passport (user principal))
  (ok (map-get? user-passports user)))

;; Get all completed courses for a passport
(define-read-only (get-passport-courses (passport-id uint))
  (ok (map-get? passport-courses passport-id)))

;; Get course information
(define-read-only (get-course-info (course-id uint))
  (ok (map-get? course-info course-id)))

;; Get passport owner
(define-read-only (get-passport-owner (passport-id uint))
  (ok (nft-get-owner? course-passport passport-id)))

;; Get total number of courses completed across all passports
(define-read-only (get-total-courses)
  (ok (var-get total-courses)))

;; Get next passport ID
(define-read-only (get-next-passport-id)
  (ok (var-get next-passport-id)))