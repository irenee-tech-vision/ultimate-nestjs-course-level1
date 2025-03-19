import { PasswordStrengthEnum } from './password-strength.enum';

const BLACKLISTED_PASSWORDS = [
  'password',
  '12345678',
  '00000000',
  '11111111',
  '22222222',
  '33333333',
  '44444444',
  '55555555',
  '66666666',
  '77777777',
  '88888888',
  '99999999',
];

export interface ValidatePasswordStrengthResponse {
  validationResult: ValidationRule[];
  score: number;
  entropy: number;
  isValid: boolean;
  password: string;
}

type ValidatePasswordStrengthModes = 'strict' | 'regex' | 'score';

interface ValidatePasswordStrengthOptions {
  maxScore?: number;
  configMessages?: ValidationMessages;
  mode?: ValidatePasswordStrengthModes;
  minBestEntropy?: number;
  minRequiredScore?: number;
}

interface ValidationRule {
  regex: RegExp;
  points: number;
  message: string;
  passed: boolean;
}

interface ValidationMessages {
  minLowercaseMessage?: string;
  minUppercaseMessage?: string;
  minSpecialCharMessage?: string;
  minNumberMessage?: string;
  minLengthMessage?: string;
}

interface ValidatePasswordRulesResponse {
  points: number;
  result: ValidationRule[];
}

function calculateEntropy(points: number, password: string): number {
  if (!points || !password) return 0;
  const passwordLength = new Set(password).size;
  return passwordLength * Math.log2(points);
}

function calculatePasswordScore(
  entropy: number,
  minBestEntropy: number,
  maxScore: number,
): number {
  if (entropy == 0) return 0;
  return Math.min(
    Math.floor(entropy / (minBestEntropy / (maxScore - 1))) + 1,
    maxScore,
  );
}

function validatePasswordRules(
  password: string,
  rules: ValidationRule[],
): ValidatePasswordRulesResponse {
  let points = 0;
  const result = rules.map((rule) => {
    if (rule.regex.test(password)) {
      rule.passed = true;
      points += rule.points;
    } else {
      rule.passed = false;
    }
    return rule;
  });

  return { points, result };
}

const defaultMessages = {
  minLowercaseMessage: 'At least 1 lowercase letter',
  minUppercaseMessage: 'At least 1 uppercase letter',
  minSpecialCharMessage: 'At least 1 special character',
  minNumberMessage: 'At least 1 number',
  minLengthMessage: 'At least 8 characters long',
};

function validatePasswordStrength(
  password: string,
  {
    maxScore = 5,
    minBestEntropy = 80,
    minRequiredScore = 3,
    mode = 'strict',
    configMessages,
  }: ValidatePasswordStrengthOptions = {},
): ValidatePasswordStrengthResponse {
  const messages = { ...defaultMessages, ...configMessages };
  minRequiredScore = minRequiredScore > maxScore ? maxScore : minRequiredScore;
  minBestEntropy = minBestEntropy < 20 ? 20 : minBestEntropy;

  let validationResult = [
    {
      regex: /[a-z]/,
      points: 26,
      message: messages.minLowercaseMessage,
      passed: false,
    },
    {
      regex: /[A-Z]/,
      points: 26,
      message: messages.minUppercaseMessage,
      passed: false,
    },
    {
      regex: /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/,
      points: 33,
      message: messages.minSpecialCharMessage,
      passed: false,
    },
    {
      regex: /[0-9]/,
      points: 10,
      message: messages.minNumberMessage,
      passed: false,
    },
    {
      regex: /.{8,}/,
      points: 1,
      message: messages.minLengthMessage,
      passed: false,
    },
  ];

  let isValid = false;

  const { result, points } = validatePasswordRules(password, validationResult);
  validationResult = result;
  const entropy = calculateEntropy(points, password);
  const score = calculatePasswordScore(entropy, minBestEntropy, maxScore);

  if (mode === 'strict') {
    isValid = score >= minRequiredScore && points === 96;
  } else if (mode === 'regex') {
    isValid = points === 96;
  } else {
    isValid = score >= minRequiredScore;
  }

  return { validationResult, score, entropy, password, isValid };
}

export const getPasswordStrength = (password: string): PasswordStrengthEnum => {
  let strength: PasswordStrengthEnum;
  if (!password || BLACKLISTED_PASSWORDS.includes(password)) {
    return PasswordStrengthEnum.WEAK;
  }

  const { score } = validatePasswordStrength(password);

  if (score < 3) {
    strength = PasswordStrengthEnum.WEAK;
  } else if (score >= 3 && score < 5) {
    strength = PasswordStrengthEnum.MEDIUM;
  } else {
    strength = PasswordStrengthEnum.STRONG;
  }

  return strength;
};
