import React, { useEffect, useState } from 'react';

const Emailbody = ({email, handleIsFavorite}) => {

  const [emailContentById, setEmailContentById] = useState({});

  useEffect(() => {
    const fetchEmail = async () => {
      let apiUrl = `https://flipkart-email-mock.now.sh/?id=${email.id}`
      try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setEmailContentById(data);
      }
      catch(err) {
         console.log('Error while fetching Email:', err);
      }
    }
    fetchEmail();
  }, [email])

  const emailBody = emailContentById?.body
  ? emailContentById.body.split(/<\/?div>|<\/?p>/g).join("\n") 
  : "No email content available"; // ✅ Safe fallback



  const formattedDate = new Date(email.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = new Date(email.date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <article className="border border-[#CFD2DC] mr-4 p-6 rounded-lg shadow-md bg-white flex gap-x-8 mt-6">
        <div className="logo h-10 w-10  p-4 rounded-full flex justify-center items-center bg-[#E54065] font-bold text-2xl font-sans text-white">
        {email.from.name.charAt(0).toUpperCase()}
        </div>

        <div className='flex flex-col'>
        <header className="mb-2 flex justify-between">
      <h2 className="font-bold text-lg">{email.from.name}</h2>
      <button className='bg-[#E54065] font-bold text-white rounded-2xl p-2 cursor-pointer' onClick={() => handleIsFavorite(email.id)}>{email.isFavorite ? 'Unmark as favorite' : 'Mark as favorite'}</button>
      </header>
      <p className="text-sm ">{formattedDate} {' '} {formattedTime}</p>
      <p className="mt-2">
      {emailBody}
      </p>
        </div> 

    </article>
  );
};

export default Emailbody;
