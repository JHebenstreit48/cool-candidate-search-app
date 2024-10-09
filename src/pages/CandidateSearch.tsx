import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
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
    // gitHubCandidateSearch(currentUser.login || "")
    gitHubSearch();
  }, []);

  return (

    <div>

      <h1>Candidate Search</h1>

      

    </div>

  )


    ;
};

export default CandidateSearch;
