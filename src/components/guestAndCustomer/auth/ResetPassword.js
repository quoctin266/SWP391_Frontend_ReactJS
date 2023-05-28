import "./ResetPassword.scss";

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <div className="ResetPasswordBox">
        <form action="" method="get" className="ResetPasswordForm">
          <h1>Reset Password</h1>
          <div className="Input">
            <label htmlFor="RecentPassword">Recent Password</label>
            <input type="password" id="RecentPassword" />
          </div>
          <div className="Input">
            <label htmlFor="NewPassword">New Password</label>
            <input type="password" id="NewPassword" />
          </div>
          <div className="Input">
            <label htmlFor="ReEnterNewPassword">Re-Enter New Password</label>
            <input type="password" id="ReEnterNewPassword" />
          </div>
          <button className="Confirm">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
