import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Card from './Card';
import Emailbody from './Emailbody';

const initialState = { isRead: false, isFavorite: false };

const EmailListings = () => {
    const [emailData, setEmailData] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`https://flipkart-email-mock.vercel.app/`);

                if (!res.ok) throw new Error("Failed to fetch emails");
                const data = await res.json();

                let allEmails = data.list.map((email) => {
                    return { ...email, ...initialState };
                });
                allEmails.sort((a, b) => b.date - a.date);
                setEmailData(allEmails);

            } catch (err) {
                setIsError( `Error: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmails();
    }, []);

    let filteredEmails = emailData
        .filter((email) => {
            if (selectedEmail && selectedEmail.id === email.id) {
                return true;
            }
            if (filterType === 'read') return email.isRead;
            if (filterType === 'unread') return !email.isRead;
            if (filterType === 'favorite') return email.isFavorite;
            return true;
        })
        .filter((email) => searchTerm.trim() === '' || email.from.name.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleFilters(type) {
        setSelectedEmail(null);
        setFilterType(type);
    }

    async function handleEmailClick(id) {
        try {
            setIsLoading(true);
            setSelectedEmail({}); 

            const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
            if (!res.ok) throw new Error("Failed to fetch email content");
            const data = await res.json();

            const cleanBody = data.body.replace(/<\/?(div|p)[^>]*>/g, "").trim();

            setEmailData((prevData) =>
                prevData.map((email) =>
                    email.id === id ? { ...email, isRead: true } : email
                )
            );

            const updatedEmail = emailData.find((email) => email.id === id);
            if (updatedEmail) {
                setSelectedEmail({ ...updatedEmail, body: cleanBody, isRead: true });
            }
        } catch (err) {
          setIsError( `Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    function handleIsFavorite(id) {
        setEmailData((prevData) =>
            prevData.map((email) =>
                email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
            )
        );

        setSelectedEmail((prev) => (prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev));
    }

    const emailList = filteredEmails.map((email) => {
        return <Card key={email.id} email={email} handleClick={handleEmailClick} selectedEmail={selectedEmail} />
    });

    let emailListingWidth = selectedEmail ? 'w-[45%]' : 'w-full';

    return (
      <div className='bg-[#F4F5F9] min-h-screen text-[#636363] relative'>
          <header className='flex justify-center items-center w-full font-bold text-3xl py-4'>Emails</header>
          <Navbar setFilterType={handleFilters} filterType={filterType} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedEmail = {setSelectedEmail} />
  
          {/* Show Error Message */}
          {isError ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-white p-4 rounded-lg shadow-lg text-red-600 font-semibold border border-red-500">
                  {isError}  
              </div>
          ) : (
              <>
                  {/* No Emails Message */}
                  {emailList.length === 0 && !isLoading && (
                      <h2 className='noContent flex justify-center items-center mt-30 font-bold text-2xl'>
                          No Emails to be shown!!
                      </h2>
                  )}
  
                  {/* Loading Spinner */}
                  {isLoading && emailList.length === 0 ? (
                      <div className="flex justify-center items-center h-[85vh]">
                          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#E54065] rounded-full animate-spin mt-8"></div>
                      </div>
                  ) : (
                      /* Email List & Body */
                      <section className='flex gap-x-4 h-[85vh]'>
                          <ul className={`${emailListingWidth} overflow-y-auto h-full pr-2`}>
                              {emailList}
                          </ul>
                          {selectedEmail && (
                              <div className='w-[55%] h-full flex-shrink-0'>
                                  <Emailbody email={selectedEmail} isLoading={isLoading} handleIsFavorite={handleIsFavorite} />
                              </div>
                          )}
                      </section>
                  )}
              </>
          )}
      </div>
  );
}
  

export default EmailListings;
