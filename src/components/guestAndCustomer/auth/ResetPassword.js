import "./ResetPassword.scss"

const ResetPassword = () => {
  return (
  <div className="reset-password-container">
      <div className="ResetPasswordBox">
        <form action="" method="get" className="ResetPasswordForm">
          <h1>Reset Password</h1>
          <div className="Input"><label for="RecentPassword">Recent Password</label><input type="password" name="RecentPassword"/></div>
          <div className="Input"><label for="NewPassword">New Password</label><input type="password" name="NewPassword"/></div>
          <div className="Input"><label for="ReEnterNewPassword">Re-Enter New Password</label><input type="password" name="ReEnterNewPassword"/></div>
          <button className="Confirm">Confirm</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;
