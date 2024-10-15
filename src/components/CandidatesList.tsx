import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

 export const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [username, setUsername] = useState<Candidate>({
    id: null,
    login: null,
    email: null,
    html_url: null,
    name: null,
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
    userData(true);
  };
console.log(candidates);
if (candidates.length === 0) {
  return <div>Loading...</div>;
}

return (
  <div>
    <ul>
        <li>
            <img src={username.avatar_url ?? ''} alt="avatar" />
            <h2>{username.name}</h2>
            <h3>{username.login}</h3>
            <p>{username.email}</p>
            <a href=""></a>
        </li>
    </ul>
    <button onClick={handleNextCandidate}>Next Candidate</button>
  </div>
);
};
