import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

export const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [username, setUsername] = useState<Candidate>({
    id: null,
    name: null,
    login: null,
    email: null,
    html_url: null,
    avatar_url: null,
    bio: null,
    company: null,
    location: null,
    blog: null,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const gitHubCandidateSearch = async (username: string | null) => {
    const gitHubAPIData = await searchGithubUser(username);
    console.log(gitHubAPIData);
    setUsername(gitHubAPIData);
  };

  const gitHubSearch = async () => {
    console.log('hello');
    const gitHubAPIData = await searchGithub();
    console.log(gitHubAPIData);
    setCandidates(gitHubAPIData);
  };

  const userData = async (currentCandidate: boolean) => {
    if (currentCandidate) {
      let candidateList: Candidate[] = [];
      let storedCandidate = localStorage.getItem('candidate');
      if (typeof storedCandidate === 'string') {
        candidateList = JSON.parse(storedCandidate);
      }
      candidateList.push(username);
      localStorage.setItem('candidate', JSON.stringify(candidateList));
    }
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
      await gitHubCandidateSearch(candidates[currentIndex + 1].login);
    } else {
      setCurrentIndex(0);
      await searchGithub();
    }
  }

  useEffect(() => {
    gitHubSearch();
  }, []);

  const handleNextCandidate = () => {
    userData(false);
  };
  console.log(candidates);
  if (candidates.length === 0) {
    return <div>Loading...</div>;
  }
  function saveCandidate() {
    userData(true);
  }

  return (
    <div className='CandidateList'>
      <ul>
        <li>
          <img src={username.avatar_url ?? ''} alt="avatar" />
          <p>{username.id}</p>
          <p>{username.name}</p>
          <p>{username.login}</p>
          <p>{username.email}</p>
          <p>{username.html_url}</p>
          <p>{username.avatar_url}</p>
          <p>{username.bio}</p>
          <p>{username.company}</p>
          <p>{username.location}</p>
          <p>{username.blog}</p>
          <a href=""></a>
        </li>
      </ul>
      <button onClick={handleNextCandidate}>Next Candidate</button>
      <button onClick={saveCandidate}>SavedCandidate</button>
    </div>
  );
};
