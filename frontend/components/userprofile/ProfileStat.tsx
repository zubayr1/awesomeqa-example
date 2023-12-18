import React, { useEffect, useState }  from 'react'
import PiechartCreate from '../Chart/PiechartCreate';

const ProfileStat = ({author_id}) => {
  
  const [data, setData] = useState([0,0]);

  useEffect(() => {
    const getAllMessageCountById = async (msgId) => {
      try {
        const response = await fetch(`http://localhost:5001/get_all_message_count_by_id/${msgId}`);
        if (response.ok) {
          const data = await response.json();
          
          setData([data[0], data[1]]);

        } else {
          console.error('Failed to fetch message count:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching message count:', error);
      }
    };

    if(author_id!==null && author_id!==undefined)
    {
        getAllMessageCountById(author_id);
    }
    
  }, [author_id]);


  return (
    <div>
        <PiechartCreate data={data} />
    </div>
  )
}

export default ProfileStat