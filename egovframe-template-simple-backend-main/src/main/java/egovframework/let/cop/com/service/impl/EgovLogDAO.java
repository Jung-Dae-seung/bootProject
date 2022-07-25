package egovframework.let.cop.com.service.impl;

import java.util.List;

import egovframework.let.cop.com.service.LogVO;
import egovframework.let.cop.com.service.UserInfVO;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

/**
 * 협업 활용 사용자 정보 조회를 위한 데이터 접근 클래스
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
@Repository("EgovLogDAO")
public class EgovLogDAO extends EgovAbstractMapper {

    /**
     * 사용자 정보에 대한 목록을 조회한다.
     *
     * @param userVO
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<LogVO> selectLogList(LogVO vo) throws Exception {
    	return (List<LogVO>) list("EgovLogDAO.selectLogList", vo);
    }

    @SuppressWarnings("unchecked")
    public int selectLogListCnt(LogVO vo) throws Exception {
    	return (Integer) selectOne("EgovLogDAO.selectLogListCnt", vo);
    }
}
