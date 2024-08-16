'use client';

import { useState } from 'react';
import Dashboard from './index';

const ProposalsPage = () => {
  const [proposals, setProposals] = useState([
    { id: 1, text: 'Dovremmo ridurre il budget per il prossimo trimestre?', votes: { agree: 5, disagree: 3 } },
    { id: 2, text: 'Implementare una politica di smart working permanente?', votes: { agree: 10, disagree: 2 } },
  ]);
  const [newProposal, setNewProposal] = useState('');

  const addProposal = () => {
    if (newProposal.trim() !== '') {
      const newProp = {
        id: proposals.length + 1,
        text: newProposal,
        votes: { agree: 0, disagree: 0 },
      };
      setProposals([...proposals, newProp]);
      setNewProposal('');
    }
  };

  const vote = (id, type) => {
    const updatedProposals = proposals.map(proposal => {
      if (proposal.id === id) {
        return {
          ...proposal,
          votes: {
            ...proposal.votes,
            [type]: proposal.votes[type] + 1,
          },
        };
      }
      return proposal;
    });
    setProposals(updatedProposals);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Proposte e Sondaggi</h2>

        {/* Sezione per aggiungere una nuova proposta */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-6">
          <input
            type="text"
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Inserisci una nuova proposta"
          />
          <button
            onClick={addProposal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Proposta
          </button>
        </div>

        {/* Lista delle proposte e votazioni */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-[#1A202C] text-white p-4 rounded-lg shadow-md">
              <div className="text-lg font-bold mb-2">{proposal.text}</div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => vote(proposal.id, 'agree')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  SI ({proposal.votes.agree})
                </button>
                <button
                  onClick={() => vote(proposal.id, 'disagree')}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  NO ({proposal.votes.disagree})
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Risultati: {proposal.votes.agree} D'accordo, {proposal.votes.disagree} Non D'accordo
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default ProposalsPage;
