import React from 'react';

const Emailbody = ({ email, handleIsFavorite, isLoading }) => {

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
    <article className="border border-[#CFD2DC] mr-4 p-6 rounded-lg shadow-md bg-white flex gap-x-8 mt-6 h-full">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#E54065] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="logo h-10 w-10 p-4 rounded-full flex justify-center items-center bg-[#E54065] font-bold text-2xl font-sans text-white">
            {email.from.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col w-full">
            <header className="mb-2 flex justify-between items-center">
              <h2 className="font-bold text-lg">{email.from.name}</h2>
              <button
                className="bg-[#E54065] font-bold text-white rounded-2xl p-2 cursor-pointer"
                onClick={() => handleIsFavorite(email.id)}
              >
                {email.isFavorite ? 'Unmark as favorite' : 'Mark as favorite'}
              </button>
            </header>
            <p className="text-sm">{formattedDate} {formattedTime}</p>
            <p className="mt-2">{email.body}</p>
          </div>
        </>
      )}
    </article>
  );
};

export default Emailbody;
