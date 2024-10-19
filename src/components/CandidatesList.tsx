import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';
import '../CSS/Candidates.css'

export const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [username, setUsername] = useState<Candidate>({
    name: null,
    login: null,
    location: null,
    avatar_url: null,
    email: null,
    html_url: null,
    company: null,
    bio: null,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const gitHubCandidateSearch = async (username: string | null) => {
    if (!username) return;
    try {
      const gitHubAPIData = await searchGithubUser(username);
      setUsername(gitHubAPIData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const gitHubSearch = async () => {
    try {
      const gitHubAPIData = await searchGithub();
      setCandidates(gitHubAPIData);
      if (gitHubAPIData.length > 0) {
        await gitHubCandidateSearch(gitHubAPIData[0].login);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    gitHubSearch();
  }, []); // Empty dependency array ensures it runs once on component mount

  const handleNextCandidate = async () => {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
      await gitHubCandidateSearch(candidates[currentIndex + 1].login);
    } else {
      setCurrentIndex(0);
      await gitHubSearch(); // Restart the search if end is reached
    }
  };

  const saveCandidate = () => {
    let candidateList: Candidate[] = JSON.parse(localStorage.getItem('candidate') || '[]');
    candidateList.push(username);
    localStorage.setItem('candidate', JSON.stringify(candidateList));
  };

  if (candidates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='CandidateList'>
      <img className="userAvatar" src={username.avatar_url ?? ''} alt='avatar' />
      <p>Username: {username.login}</p>
      <p>Name: {username.name}</p>
      <p>Location: {username.location}</p>
      <p>E-Mail: {username.email}</p>
      <p>GitHub: {username.html_url}</p>
      <p>Company: {username.company}</p>
      <p>Bio: {username.bio}</p>
      <button className="fa-solid fa-circle-minus" onClick={handleNextCandidate}></button>
      <button className="fa-solid fa-circle-plus" onClick={saveCandidate}></button>
    </div>
  );
};

// import { useEffect, useState } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';
// import type { Candidate } from '../interfaces/Candidate.interface';

// export const Candidates = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [username, setUsername] = useState<Candidate>({
//     name: null,
//     login: null,
//     location: null,
//     avatar_url: null,
//     email: null,
//     html_url: null,
//     company: null,
//     bio: null
//   });

//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   const gitHubCandidateSearch = async (username: string | null) => {
//     const gitHubAPIData = await searchGithubUser(username);
//     console.log(gitHubAPIData);
//     setUsername(gitHubAPIData);
//   };

//   const gitHubSearch = async () => {
//     const gitHubAPIData = await searchGithub();
//     console.log(gitHubAPIData);
//     setCandidates(gitHubAPIData);
//     await gitHubCandidateSearch(gitHubAPIData[0]?.login);
//   };

//   const userData = async (currentCandidate: boolean) => {
//     if (currentCandidate) {
//       let candidateList: Candidate[] = [];
//       let storedCandidate = localStorage.getItem('candidate');
//       if (typeof storedCandidate === 'string') {
//         candidateList = JSON.parse(storedCandidate);
//       }
//       candidateList.push(username);
//       localStorage.setItem('candidate', JSON.stringify(candidateList));
//     }
//     if (currentIndex + 1 < candidates.length) {
//       setCurrentIndex(currentIndex + 1);
//       await gitHubCandidateSearch(candidates[currentIndex + 1].login || '');
//     } else {
//       setCurrentIndex(0);
//       await searchGithub();
//     }
//   }

//   useEffect(() => {
//     gitHubSearch();
//     gitHubCandidateSearch(candidates[currentIndex]?.login || '');
//   }, []);

//   const handleNextCandidate = () => {
//     userData(false);
//   };
//   console.log(candidates);
//   if (candidates.length === 0) {
//     return <div>Loading...</div>;
//   }
//   function saveCandidate() {
//     userData(true);
//   }

//   return (
//     <div className='CandidateList'>
//           <img src={username.avatar_url ?? ''} alt="avatar" />
//           <p>Username: {username.login}</p>
//           <p>Name: {username.name}</p>
//           <p>Location: {username.location}</p>
//           <p>E-Mail: {username.email}</p>
//           <p>GitHub: {username.html_url}</p>
//           <p>Company: {username.company}</p>
//           <p>Bio: {username.bio}</p>
//           <a href=""></a>
//       <button onClick={handleNextCandidate}>Next Candidate</button>
//       <button onClick={saveCandidate}>SavedCandidate</button>
//     </div>
//   );
// };
