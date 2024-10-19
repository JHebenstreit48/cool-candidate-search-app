import { useEffect, useState } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';
import '../CSS/savedCandidates.css';

function SavedCandidatesList() {
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const savedCandidatesInfo = window.localStorage.getItem('candidate') !== null;
        setSavedCandidates(
            savedCandidatesInfo ?
                JSON.parse(window.localStorage.getItem('candidate')!) :
                []
        );
    }, []);

    useEffect(() => {

    }, [savedCandidates]);


    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Location</th>
                        <th>Avatar</th>
                        <th>E-Mail</th>
                        <th>GitHub</th>
                        <th>Company</th>
                        <th>Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {savedCandidates.map((candidateInfo, index) =>
                        <tr key={candidateInfo.name ?? '' + index}>
                            <td>{candidateInfo.name}</td>
                            <td>{candidateInfo.login}</td>
                            <td>{candidateInfo.location}</td>
                            <td><img className="savedCandidatesAvatar" src={candidateInfo.avatar_url!} alt={candidateInfo.name ?? ''} /></td>
                            <td>{candidateInfo.email}</td>
                            <td>{candidateInfo.html_url}</td>
                            <td>{candidateInfo.company}</td>
                            <td>{candidateInfo.bio}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </>
    );
};

export default SavedCandidatesList;
