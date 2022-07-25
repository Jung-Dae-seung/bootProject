<%--
  Class Name : EgovTemplateList.jsp
  Description : 템플릿 목록화면
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2009.03.18   이삼섭          최초 생성
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 공통서비스 개발팀 이삼섭
    since    : 2009.03.18
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Language" content="ko">
<link href="<c:url value='/'/>css/common.css" rel="stylesheet"
	type="text/css">

<script type="text/javascript">
</script>
<title>템플릿 목록</title>

<style type="text/css">
h1 {
	font-size: 12px;
}

caption {
	visibility: hidden;
	font-size: 0;
	height: 0;
	margin: 0;
	padding: 0;
	line-height: 0;
}

A:link {
	color: #000000;
	text-decoration: none;
}

A:visited {
	color: #000000;
	text-decoration: none;
}

A:active {
	color: #000000;
	text-decoration: none;
}

A:hover {
	color: #fa2e2e;
	text-decoration: none;
}
</style>


</head>
<body>
	<noscript class="noScriptTitle">자바스크립트를 지원하지 않는 브라우저에서는 일부
		기능을 사용하실 수 없습니다.</noscript>
	<!-- 전체 레이어 시작 -->
	<div id="wrap">
		<!-- header 시작 -->
		<div id="header_mainsize">
			<c:import url="/EgovPageLink.do?link=main/inc/EgovIncHeader" />
		</div>
		<div id="topnavi">
			<c:import url="/EgovPageLink.do?link=main/inc/EgovIncTopnav" />
		</div>
		<!-- //header 끝 -->
		<!-- container 시작 -->
		<div id="container">
			<!-- 좌측메뉴 시작 -->
			<div id="leftmenu">
				<c:import url="/EgovPageLink.do?link=main/inc/EgovIncLeftmenu" />
			</div>
			<!-- //좌측메뉴 끝 -->
			<!-- 현재위치 네비게이션 시작 -->
			<div id="content">
				<div id="cur_loc">
					<div id="cur_loc_align">
						<ul>
							<li>HOME</li>
							<li>&gt;</li>
							<li>사이트관리</li>
							<li>&gt;</li>
							<li><strong>사용자관리</strong></li>
						</ul>
					</div>
				</div>
				<!-- 검색 필드 박스 시작 -->
				<div id="search_field">
					<div id="search_field_loc">
						<h2>
							<strong>사용자 목록</strong>
						</h2>
					</div>
					<form name="frm"action="<c:url value='/cop/com/selectTemplateInfs.do'/>"method="post">
						<fieldset>
							<legend>조건정보 영역</legend>
							<div class="sf_start">
								<ul id="search_first_ul">
									<li>
									</li>
									<li></li>
								</ul>
								<ul id="search_second_ul">
									<li>
										<div class="buttons"
											style="position: absolute; left: 870px; top: 182px;">
											<a href="<c:url value='/cop/com/selectTemplateInfs.do'/>"
												onclick="javascript:fn_egov_select_tmplatInfo('1'); return false;"><img
												src="<c:url value='/images/img_search.gif" alt="search' />" />조회
											</a> <a href="<c:url value='/cop/com/addTemplateInf.do'/>"
												onclick="javascript:fn_egov_insert_addTmplatInfo(); return false;">등록</a>
										</div>
									</li>
								</ul>
							</div>
						</fieldset>
					</form>
				</div>
				<!-- //검색 필드 박스 끝 -->

				<!-- div id="page_info"><div id="page_info_align">총 <strong>321</strong>건 (<strong>1</strong> / 12 page)</div></div-->
				<!-- table add start -->
				<div class="default_tablestyle">
					<table summary="번호,게시판명,사용 커뮤니티 명,사용 동호회 명,등록일시,사용여부   목록입니다"
						cellpadding="0" cellspacing="0">
						<caption>게시판 템플릿 목록</caption>
						<colgroup>
							<col width="5%">
							<col width="10%">
							<col width="10%">
							<col width="10%">
							<col width="5%">
							<col width="5%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col" class="f_field" nowrap="nowrap">번호</th>
								<th scope="col" nowrap="nowrap">아이디</th>
								<th scope="col" nowrap="nowrap">부서명</th>
								<th scope="col" nowrap="nowrap">사용자명</th>
								<th scope="col" nowrap="nowrap">사용여부</th>
								<th scope="col" nowrap="nowrap">권한</th>
								<th scope="col" nowrap="nowrap">등록일</th>
							</tr>
						</thead>
						<tbody>

							<c:forEach var="result" items="${list}" varStatus="status">
								<!-- loop 시작 -->
								<tr>
									<td><c:out value="${status.count}"/></td>
									<td><c:out value="${result.emplyrId}" /></td>
									<td><c:out value="${result.userDeptNm}" /></td>
									<td><c:out value="${result.userNm}" /></td>
									<td><c:out value="${result.useYn}" /></td>
									<td><c:out value="${result.authorNm}" /></td>
									<td><c:out value="${result.sbscrbDe}" /></td>
								</tr>
							</c:forEach>
							<c:if test="${fn:length(list) == 0}">
								<tr>
									<td nowrap colspan="6"><spring:message
											code="common.nodata.msg" /></td>
								</tr>
							</c:if>
						</tbody>
					</table>
				</div>
				<!-- 페이지 네비게이션 시작 -->
				<div id="paging_div">
					<ul class="paging_align">
					</ul>
				</div>
				<!-- //페이지 네비게이션 끝 -->
			</div>
			<!-- //content 끝 -->
		</div>
		<!-- //container 끝 -->
		<!-- footer 시작 -->
		<div id="footer">
			<c:import url="/EgovPageLink.do?link=main/inc/EgovIncFooter" />
		</div>
		<!-- //footer 끝 -->
	</div>
	<!-- //전체 레이어 끝 -->
</body>
</html>