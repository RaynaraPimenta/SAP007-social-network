import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from './export.js';
import { auth } from './start-firebase.js';
import { userCollection } from './user.js';

export function registerNewUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      sendEmailVerification(auth.currentUser)
        .then(() => {
          userCollection(name, email, userId);
          window.location.hash = '#feed';
        })
        .catch(() => {
          message.innerHTML = 'Email de verificação não enviado!';
        });
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          message.innerHTML = 'Email já cadastrado! Escolha outro email.';
          break;
        case 'auth/weak-password':
          message.innerHTML = 'Sua senha deve ter no mínimo 6 caracteres.';
          break;
        default:
      }
    });
}

export function authUserLabFriends(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.hash = '#feed';
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          message.innerHTML = 'Usuário não encontrado! <br>Crie um cadastro na LabFriends!';
          break;
        case 'auth/wrong-password':
          message.innerHTML = 'Senha errada! Digite novamente!';
          break;
        default:
      }
    });
}

export function authUserWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const userName = result.user.displayName;
      const userEmail = result.user.email;
      const userId = credential.accessToken;
      userCollection(userName, userEmail, userId);
      window.location.hash = '#feed';
    })
    .catch((error) => {
      GoogleAuthProvider.credentialFromError(error);
    });
}

export function logout() {
  return signOut(auth).then();
}

export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
