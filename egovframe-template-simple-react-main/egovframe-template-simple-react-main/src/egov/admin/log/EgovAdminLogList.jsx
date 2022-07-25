import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminLogList(props) {
	console.group("EgovAdminNoticeList");
    console.log("[Start] EgovAdminNoticeList ------------------------------");
    console.log("EgovAdminNoticeList [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminNoticeList [history] : ", history);

    let searchCnd = '0';
    let searchWrd = '';

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

    const retrieveList = (searchCondition) => {
        console.groupCollapsed("EgovAdminNoticeList.retrieveList()");

        const retrieveListURL = '/cop/com/selectLogListAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

				console.log(resp.result.paginationInfo);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                    mutListTag.push(
                        <Link
							to={{
								pathname: URL.ADMIN_LOG,
								state: {
									logId: item.logId,
									loginId: item.loginId,
									loginNm: item.loginNm,
									loginMthd: item.loginMthd,
									conectIp: item.conectIp,
									creatDt: item.creatDt,
									searchCondition: searchCondition
								}
							}} key={listIdx} className="list_item">
							<div>{listIdx}</div>
							<div>{item.logId}</div>
							<div>{item.loginId}</div>
							<div>{item.loginNm}</div>
							<div>{item.loginMthd}</div>
							<div>{item.conectIp}</div>
							<div>{item.creatDt}</div>
						</Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovAdminNoticeList.retrieveList()");
    }

    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, [searchCondition]);

    console.log("------------------------------EgovAdminNoticeList [End]");
    console.groupEnd("EgovAdminNoticeList");

	return (
		<div className="container">
			<div className="c_wrap">
				{/* <!-- Location --> */}
				<div className="location">
					<ul>
						<li><Link to={URL.MAIN} className="home">Home</Link></li>
						<li><Link to={URL.ADMIN} >사이트관리</Link></li>
						<li>로그관리</li>
					</ul>
				</div>
				{/* <!--// Location --> */}

				<div className="layout">
					{/* <!-- Navigation --> */}
					<EgovLeftNav></EgovLeftNav>
					{/* <!--// Navigation --> */}

					<div className="contents NOTICE_LIST" id="contents">
						{/* <!-- 본문 --> */}

						<div className="top_tit">
							<h1 className="tit_1">사이트관리</h1>
						</div>

						<h2 className="tit_2">로그관리</h2>

						{/* <!--// 검색조건 --> */}
						<div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd}
                                            onChange={e => {
                                                searchCnd = e.target.value;
                                                // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option value="0">사용자ID</option>
                                            <option value="1">사용자명</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition.searchWrd} placeholder=""
                                            onChange={e => {
                                                searchWrd = e.target.value;
                                                //setSearchCondition({ ...searchCondition, searchWrd: e.target.value });
                                            }}
                                        />
                                        <button type="button"
                                            onClick={e => {
                                                // onClickSearch
                                                setSearchCondition({ ...searchCondition, pageIndex: 1, searchCnd: searchCnd, searchWrd: searchWrd });
                                            }}>조회</button>
                                    </span>
                                </li>
                            </ul>
                        </div>
						{/* <!-- 게시판목록 --> */}
						<div className="board_list BRD009">
							<div className="head">
								<span>번호</span>
								<span>로그ID</span>
								<span>사용자ID</span>
								<span>사용자명</span>
								<span>로그유형</span>
								<span>IP</span>
								<span>발생일자</span>
							</div>
							<div className="result">
								{listTag}
							</div>
						</div>
						{/* <!--// 게시판목록 --> */}
						<div className="board_bot">
							{/* <!-- Paging --> */}
							<EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
								setSearchCondition({ ...searchCondition, pageIndex: passedPage });
							}}></EgovPaging>
							{/* <!--/ Paging --> */}
						</div>
						{/* <!--// 본문 --> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default EgovAdminLogList;