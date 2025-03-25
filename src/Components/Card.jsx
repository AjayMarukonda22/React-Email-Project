import React, { useState } from 'react';

const Card = ({ email, handleClick, selectedEmail }) => {

  let description = email.short_description;
  if(selectedEmail) {
        description = description.substring(0, 30) + '....'
  }
  
  

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
    <article className= {`flex gap-6 p-6 border ${( selectedEmail && selectedEmail.id === email.id) ? 'border-[#E54065]' : 'border-[#CDF2DC]'} rounded-lg shadow-md w-[90%] my-6 mx-auto cursor-pointer ${email.isRead ? 'bg-white' : ''}`} onClick={ () => {handleClick(email.id)}} >
      <div className="logo h-10 w-10 rounded-full p-4 flex justify-center items-center bg-[#E54065] font-bold text-white">
        {email.from.name.charAt(0).toUpperCase()}
      </div>
      <div className="email">
        <header>
          <p>
          From: {' '}<strong>{email.from.name} ({email.from.email})</strong>
          </p>
         <p> Subject: <strong>{email.subject}</strong> </p> 
        </header>
        <p className='description py-2'>{description}</p>
        <footer className="text-sm ">
          <span>{formattedDate}</span> {' '}
          <span className='time ml-2'>{formattedTime}</span>   {email.isFavorite && <span className='ml-4 text-[#E54065] font-semibold'>favorite</span>}
        </footer>
      </div>
    </article>
  );

};



export default Card;
