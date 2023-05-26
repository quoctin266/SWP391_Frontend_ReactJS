import styles from './ResetPassword.module.css'

const ResetPassword = () => {
  return (
  <div className={styles['reset-password-container']}>
      <div className={styles.ResetPasswordBox}>
        <form action="" method="get" className={styles.ResetPasswordForm}>
          <h1>Reset Password</h1>
          <div className={styles.Input}><label for="RecentPassword">Recent Password</label><input type="password" name="RecentPassword"/></div>
          <div className={styles.Input}><label for="NewPassword">New Password</label><input type="password" name="NewPassword"/></div>
          <div className={styles.Input}><label for="ReEnterNewPassword">Re-Enter New Password</label><input type="password" name="ReEnterNewPassword"/></div>
          <button className={styles.Confirm}>Confirm</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;
