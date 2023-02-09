//유저회원가입 이메일 제약 정규식
const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//유저회원가입 비밀번호 제약 정규식
const PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,20})";

module.exports = {
  EMAIL_REGEX,
  PASSWORD_REGEX,
};
