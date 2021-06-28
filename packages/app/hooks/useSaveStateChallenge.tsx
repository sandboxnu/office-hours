export interface OAuthStateChallenge {
  state: string;
  challenge: string;
}

/**
 *
 * @param stateLength How long the state value should be
 * @param hashLength  How long the plaintext value of the challenge should be
 * @returns The pair of the state and challenge plaintext value
 */
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
