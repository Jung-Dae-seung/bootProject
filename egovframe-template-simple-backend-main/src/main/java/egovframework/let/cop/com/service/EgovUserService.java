package egovframework.let.cop.com.service;

import java.util.List;
import java.util.Map;

/**
 * 협업 기능에서 사용자 정보를 관리하기 위한 서비스 인터페이스 클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.04.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.06  이삼섭          최초 생성
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성 
 *
 * </pre>
 */
public interface EgovUserService {
	
	public List<UserVO> selectUserList(UserVO vo) throws Exception;
	
	public Map<String, Object> selectUserListAPI(UserVO vo) throws Exception;
	
	public void insertUserData(Map<String, Object> map) throws Exception;
	
	public UserVO selectUserDetial(UserVO vo) throws Exception;
}
