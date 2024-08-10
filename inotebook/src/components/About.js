import React, { useEffect } from 'react';

function About(props) {
  useEffect (() => {
    props.setProgress(100)
  }, [])
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">About NoteHub</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold text-slate-600">NoteHub</span>, your ultimate solution for managing and accessing your notes effortlessly. Our platform is designed to ensure that your thoughts, ideas, and important information are always at your fingertips. Whether you’re on the go or at your desk, NoteHub provides a seamless experience for note-taking and retrieval.
        </p>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          At NoteHub, our mission is to help you stay organized and productive by giving you access to your notes anytime, anywhere. With a user-friendly interface and robust features, we make sure your notes are always synchronized and secure across all your devices.
        </p>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Why Choose NoteHub?</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>**Seamless Synchronization**: Your notes are automatically updated and synchronized across all your devices.</li>
          <li>**Secure Storage**: Your data is protected with top-notch security measures to ensure privacy and safety.</li>
          <li>**User-Friendly Design**: Enjoy an intuitive and clean interface designed to make note-taking easy and efficient.</li>
          <li>**Access Anywhere**: Whether you're on a mobile device or desktop, NoteHub is always accessible.</li>
        </ul>
        <p className="text-lg text-gray-700">
          Join us on this journey to make note-taking simple, secure, and accessible. Experience the freedom of having your notes with you wherever you go, and discover how NoteHub can help you stay organized and productive.
        </p>
      </div>
    </div>
  );
}

export default About;
