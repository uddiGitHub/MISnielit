import React, { useState } from 'react';
import styles from './StudDashboard.module.css';

function StudDashboard() {
  const [studentData, setStudentData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    studentId: 'ST2024001',
    email: 'john.doe@example.com',
    fatherName: 'James Doe',
    motherName: 'Jane Doe',
    address: '123 Education Street',
    phoneNumber: '(555) 123-4567'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated student data:', studentData);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            <div className={styles.profileImage}>
              <img
                src="/api/placeholder/96/96"
                alt="Profile"
                className={styles.profileImage}
              />
            </div>
            <button className={styles.profileImageUpload}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{`${studentData.firstName} ${studentData.lastName}`}</h1>
            <p className={styles.profileId}>Student ID: {studentData.studentId}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`${styles.editButton} ${isEditing ? styles.editing : styles.default}`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={studentData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={studentData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={studentData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={studentData.fatherName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={studentData.motherName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={studentData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>
            </div>

            {isEditing && (
              <div className={styles.submitContainer}>
                <button
                  type="submit"
                  className={styles.saveButton}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default StudDashboard;