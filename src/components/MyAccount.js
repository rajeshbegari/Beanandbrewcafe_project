import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig';
import '../styles.css';

const MyAccount = () => {
  const { user, logout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  
  const storage = getStorage();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setAddress(data.address || '');
          setPhoneNumber(data.phoneNumber || '');
          setProfilePictureUrl(data.profilePictureUrl || '');
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let profilePicUrl = profilePictureUrl;
    
    if (profilePicture) {
      const profilePicRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(profilePicRef, profilePicture);
      profilePicUrl = await getDownloadURL(profilePicRef);
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        address,
        phoneNumber,
        profilePictureUrl: profilePicUrl,
      });
      setMessage('Profile updated successfully.');
      setProfilePictureUrl(profilePicUrl);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
    }

    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Account</h2>
      {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Resident Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            className="form-control-file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {profilePictureUrl && (
            <div className="mt-3">
              <img src={profilePictureUrl} alt="Profile" className="img-thumbnail" style={{ width: '150px', height: '150px' }} />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default MyAccount;