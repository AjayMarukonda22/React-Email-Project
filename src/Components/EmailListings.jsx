import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Card from './Card';
import Emailbody from './Emailbody';

const initialState = {isRead : false, isFavorite : false};

const EmailListings = () => {

    const [emailData, setEmailData] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
     const fetchEmails = async () => {
        try {
           const res = await fetch(`https://flipkart-email-mock.vercel.app/`);
           const data = await res.json();

           let allEmails = data.list.map((email) => {
             return {...email, ...initialState};
           });

           setEmailData(allEmails);
        }
        catch(err) {
            console.log(`Error while fetching emails:`, err);
        }
     }
     fetchEmails();

    }, []);

    const filteredEmails = emailData.filter((email) => {
        if(selectedEmail && selectedEmail.id === email.id) {
          return true;
        }

        if(filterType === 'read') return email.isRead;
        if(filterType === 'unread') return !email.isRead;
        if(filterType === 'favorite') return email.isFavorite;

        return true;
    })

    function handleFilters(type) {
          setSelectedEmail(null);
          setFilterType(type);
    }
    
    

    function handleEmailClick(id) {
      setEmailData(prevData =>
        prevData.map(email =>
          email.id === id ? { ...email, isRead: true } : email
        )
      );
    
      // Ensure `selectedEmail` picks the latest version from `emailData`
      setSelectedEmail(emailData.find(email => email.id === id));
    }

    

     function handleIsFavorite(id) {
      setEmailData(prevData =>
        prevData.map(email =>
          email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
        )
      );
    
      // Update `selectedEmail` so Emailbody reflects the new state
      setSelectedEmail(prev => (prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev));
    }
    

    const emailList = filteredEmails.map((email) => {
        return <Card key = {email.id}  email={email} handleClick={handleEmailClick} selectedEmail={selectedEmail} />
    })


    let emailListingWidth = 'w-full';
    if(selectedEmail) {
    emailListingWidth = 'w-[45%]';
       
    }

  return (
    <div className='bg-[#F4F5F9] text-[#636363]'>
      <header className='flex justify-center items-center w-full font-bold text-3xl py-4'>Emails</header>
         <Navbar setFilterType = {handleFilters} filterType = {filterType} />
         {emailList.length === 0 && <h2 className='noContent flex justify-center items-center mt-30 font-bold text-2xl'>No Emails to be shown!!</h2>}
         <section className='flex  gap-x-4'>
         <ul className= {`${emailListingWidth}`}>
            {emailList}
         </ul>
         {selectedEmail && <Emailbody email = {selectedEmail} handleIsFavorite = {handleIsFavorite} />}
         </section>
    </div>
  )
}

export default EmailListings