package egovframework.let.cop.com.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import egovframework.let.cop.com.service.BoardUseInf;
import egovframework.let.cop.com.service.BoardUseInfVO;
import egovframework.let.cop.com.service.EgovBBSUseInfoManageService;
import egovframework.let.cop.com.service.EgovLogService;
import egovframework.let.cop.com.service.LogVO;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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
@Service("EgovLogService")
public class EgovLogServiceImpl extends EgovAbstractServiceImpl implements EgovLogService {
	
    @Resource(name = "EgovLogDAO")
    private EgovLogDAO egovLogDAO;

	@Override
	public List<LogVO> selectLogList(LogVO vo) throws Exception {
		return egovLogDAO.selectLogList(vo);
	}

	@Override
	public Map<String, Object> selectLogListAPI(LogVO vo) throws Exception {
		List<LogVO> list = egovLogDAO.selectLogList(vo);
		int cnt = egovLogDAO.selectLogListCnt(vo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}

    
}
