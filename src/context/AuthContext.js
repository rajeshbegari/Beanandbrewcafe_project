import React, { createContext, useState, useEffect } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setUser({ ...currentUser, ...userDoc.data() });
        const wishlistDoc = await getDoc(doc(db, 'wishlists', currentUser.uid));
        setWishlist(wishlistDoc.exists() ? wishlistDoc.data().items : []);
      } else {
        setUser(null);
        setWishlist([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      address: '',
      phoneNumber: '',
      profilePictureUrl: '',
    });
    await setDoc(doc(db, 'wishlists', user.uid), {
      items: [],
    });
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setUser({ ...user, ...userDoc.data() });
      const wishlistDoc = await getDoc(doc(db, 'wishlists', user.uid));
      setWishlist(wishlistDoc.exists() ? wishlistDoc.data().items : []);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('Invalid username');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Invalid password');
      } else {
        throw new Error('Login failed');
      }
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent.');
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  const addToWishlist = async (item) => {
    if (!user) {
      alert('You need to be logged in to add items to the wishlist.');
      return;
    }

    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    await updateDoc(doc(db, 'wishlists', user.uid), {
      items: updatedWishlist
    });
  };

  const removeFromWishlist = async (itemId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
    await updateDoc(doc(db, 'wishlists', user.uid), {
      items: updatedWishlist
    });
  };

  const moveToCart = async (item, addToCart) => {
    await removeFromWishlist(item.id);
    addToCart(item);
  };

  const moveAllToCart = async (addToCart) => {
    wishlist.forEach(item => addToCart(item));
    setWishlist([]);
    await updateDoc(doc(db, 'wishlists', user.uid), {
      items: []
    });
  };

  const deleteAllWishlistItems = async () => {
    setWishlist([]);
    await updateDoc(doc(db, 'wishlists', user.uid), {
      items: []
    });
  };

  const moveFromCartToWishlist = async (item, removeFromCart) => {
    await addToWishlist(item);
    removeFromCart(item.id);
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      register, 
      login, 
      resetPassword, 
      logout,
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      moveToCart, 
      moveAllToCart, 
      deleteAllWishlistItems, 
      moveFromCartToWishlist 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
