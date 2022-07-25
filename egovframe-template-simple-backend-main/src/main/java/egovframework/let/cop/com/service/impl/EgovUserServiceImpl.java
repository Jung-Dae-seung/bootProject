package egovframework.let.cop.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import egovframework.let.cop.com.service.EgovUserService;
import egovframework.let.cop.com.service.LogVO;
import egovframework.let.cop.com.service.UserVO;

/**
 * 게시판 이용정보를 관리하기 위한 서비스 구현 클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.04.02
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.02  이삼섭          최초 생성
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성 
 *
 * </pre>
 */
@Service("EgovUserService")
public class EgovUserServiceImpl extends EgovAbstractServiceImpl implements EgovUserService {
	
    @Resource(name = "EgovUserDAO")
    private EgovUserDAO egovUserDAO;

	@Override
	public List<UserVO> selectUserList(UserVO vo) throws Exception {
		return egovUserDAO.selectUserList(vo);
	}

	@Override
	public Map<String, Object> selectUserListAPI(UserVO vo) throws Exception {
		List<UserVO> list = egovUserDAO.selectUserList(vo);
		int cnt = egovUserDAO.selectUserListCnt(vo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}

	@Override
	public void insertUserData(Map<String, Object> map) throws Exception {
		egovUserDAO.insertUserData(map);
	}

	@Override
	public UserVO selectUserDetial(UserVO vo) throws Exception {
		return egovUserDAO.selectUserDetail(vo);
	}


    
}
