export interface OAuthStateChallenge {
  state: string;
  challenge: string;
}

export function useSaveStateChallenge(
  stateLength: number,
  hashLength: number
): OAuthStateChallenge {
  const state = Math.random().toString(20).substr(2, stateLength);
  const challenge = Math.random().toString(20).substr(2, hashLength);

  return {
    state,
    challenge,
  };
}
