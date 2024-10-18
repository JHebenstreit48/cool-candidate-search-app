import { useEffect, useState } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';

function SavedCandidatesList() {
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const savedCandidatesInfo = window.localStorage.getItem('savedCandidates') !== null;
        setSavedCandidates(
            savedCandidatesInfo ?
            JSON.parse(window.localStorage.getItem('savedCandidates')!) : []
            );
    }, []);


    return (
        <>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>HTML URL</th>
                    <th>Avatar URL</th>
                    <th>Bio</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Blog</th>
                </tr>
            </thead>
            <tbody>
                {savedCandidates.length > 0 && savedCandidates.map((candidateInfo, index) =>
                    <tr key={candidateInfo.name ?? '' + index}>
                        <td>{candidateInfo.id}</td>
                        <td>{candidateInfo.name}</td>
                        <td>{candidateInfo.login}</td>
                        <td>{candidateInfo.email}</td>
                        <td>{candidateInfo.html_url}</td>
                        <td><img/> src={candidateInfo.avatar_url}</td>
                        <td>{candidateInfo.bio}</td>
                        <td>{candidateInfo.company}</td>
                        <td>{candidateInfo.location}</td>
                        <td>{candidateInfo.blog}</td>
                    </tr>
                )}
            </tbody>
        </table>
        
        </>
    );
};

export default SavedCandidatesList;
