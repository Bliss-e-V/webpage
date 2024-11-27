import React from 'react';
import { Headline } from './Headline';
import { members } from './data/members';

export const Members = () => {
  const shuffledMembers = [...members].sort(() => Math.random() - 0.5);

  return (
    <div className="flex items-center flex-col justify-center max-w-2/3 mb-40">
      <div id="speaker-series" className="text-center pt-32 mb-6">
        <Headline level={2}>Team</Headline>
        <p className="mt-4 font-light leading-relaxed text-secondary text-md sm:text-xl">
          Get to know the team!
        </p>
      </div>
      <div className="flex flex-wrap flex-row flex-grow-0">
        {shuffledMembers.map((member) => (
          <a key={member.name} href={member.link}>
            <div className="flex flex-col items-center justify-center w-24 p-4">
              <div>
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="rounded-full h-16 w-16"
                />
              </div>
              <div className="text-center">{member.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
