import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const CalendarComponent = () => {
  const { data, status } = useSession();
  const [events, setEvents] = useState([]);

  console.log({ events })

  useEffect(() => {
    if (data?.user) {
      fetch('/api/calendar')
        .then(response => response.json())
        .then((data: any)=> {
            console.log({ data })
        });
    }
  }, [ data ]);

    if (status === 'loading' ) return <p>Loading...</p>;

  return (
    <div>
      {!data?.user ? (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <ul>
            {events?.map((event, id) => (
              <li key={id}>Prueba</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CalendarComponent;
