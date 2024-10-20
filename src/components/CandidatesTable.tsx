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

    const removeCandidate = (index: number) => {
        const updatedCandidates = [...savedCandidates];
        updatedCandidates.splice(index, 1);
        setSavedCandidates(updatedCandidates);
        window.localStorage.setItem('candidate', JSON.stringify(updatedCandidates));
    };

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
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {savedCandidates.map((candidateInfo, index) =>
                        <tr key={candidateInfo.name ?? '' + index}>
                            <td className="data">{candidateInfo.name}</td>
                            <td className="data">{candidateInfo.login}</td>
                            <td className='data'>{candidateInfo.location}</td>
                            <td><img className="savedCandidatesAvatar" src={candidateInfo.avatar_url!} alt={candidateInfo.name ?? ''} /></td>
                            <td className="data">{candidateInfo.email}</td>
                            <td className="data">{candidateInfo.html_url}</td>
                            <td className="data">{candidateInfo.company}</td>
                            <td className="data">{candidateInfo.bio}</td>
                            <td>
                                <button className="fa-solid fa-circle-minus" onClick={() => removeCandidate(index)}></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </>
    );
};

export default SavedCandidatesList;
