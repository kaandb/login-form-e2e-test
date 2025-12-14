import React, { useState, useEffect } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    
    const isEmailValid = EMAIL_REGEX.test(email);
    if (email.length > 0 && !isEmailValid) {
      setEmailError('Lütfen geçerli bir email adresi girin.');
    } else {
      setEmailError('');
    }

    const isPasswordStrong = PASSWORD_REGEX.test(password);
    if (password.length > 0 && !isPasswordStrong) {
      setPasswordError(
        'Şifreniz en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.'
      );
    } else {
      setPasswordError('');
    }
    
    const canSubmit = isEmailValid && isPasswordStrong && termsAccepted;
    setIsFormValid(canSubmit);

  }, [email, password, termsAccepted]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onLoginSuccess();
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc' }}>
      <h2>Kullanıcı Girişi</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {emailError && <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{emailError}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Şifre:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {passwordError && <p className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{passwordError}</p>}
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            id="terms" 
            name="terms" 
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            style={{ marginRight: '10px' }}

          />
          <label htmlFor="terms">Şartları kabul ediyorum.</label>
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid}
          style={{ padding: '10px 15px', backgroundColor: isFormValid ? 'green' : '#ccc', color: 'white', border: 'none', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;