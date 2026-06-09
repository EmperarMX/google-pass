export type SaveRestrictions = {
   /**
    * Restrict the save of the referencing object to the given email address only. This is the hex output of SHA256 sum of the email address, all lowercase and without any notations like "." or "+", except "@".
    * For example, for example@example.com, this value will be 31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66 and for Example@example.com, this value will be bc34f262c93ad7122763684ccea6f07fb7f5d8a2d11e60ce15a6f43fe70ce632
    * If email address of the logged-in user who tries to save this pass does not match with the defined value here, users won't be allowed to save this pass. They will instead be prompted with an error to contact the issuer.
    * This information should be gathered from the user with an explicit consent via Sign in with Google integration https://developers.google.com/identity/authentication. Please contact with support before using Save Restrictions.
    */
   restrictToEmailSha256?: string
}