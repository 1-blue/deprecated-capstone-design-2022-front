# DB 생성
CREATE DATABASE jslogDB DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

# 유저 생성 및 패스워드 지정 ( 패스워드는 혹시 모르니 명시안함 )
CREATE user jslogUser@'%' IDENTIFIED BY '비밀번호알아서작성';

# 유저 권한 부여
GRANT ALL PRIVILEGES ON jslogDB.* TO 'jslogUser'@'%';

# 유저 권한 부여한거 적용
flush privileges;

# 유저 삭제
drop user jslogUser@'%';

# DB 삭제
drop database jslog;