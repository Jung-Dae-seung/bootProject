import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminUserList(props) {
	console.group("EgovAdminNoticeList");
    console.log("[Start] EgovAdminNoticeList ------------------------------");
    console.log("EgovAdminNoticeList [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminNoticeList [history] : ", history);

    let searchCnd = '';
    let searchWrd = '';
	let searchUseYn = '';
	let searchSrch = '';

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { pageIndex: 1, searchCnd: '', searchWrd: '', searchUseYn: '', searchSrch: ''});// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});
	const [checkItems, setCheckItems] = useState([])

    const [listTag, setListTag] = useState([]);

    const retrieveList = (searchCondition) => {
        console.groupCollapsed("EgovAdminNoticeList.retrieveList()");

        const retrieveListURL = '/cop/com/selectUserListAPI.do';
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
                        <div className="list_item">
							<div>{listIdx}</div>
							<div>
								<input type="checkbox" value={item.emplyrId} id={listIdx}/>
								<input type="hidden" value={item.uniqId}/>
							</div>
							<div style={{width:"100px"}}>
								<Link 
									to={URL.ADMIN_USER_DETAIL}>
									{item.emplyrId}
								</Link>
							</div>
							<div style={{width:"100px"}}>{item.userDeptNm}</div>
							<div style={{width:"100px"}}>{item.userNm}</div>
							<div>
								<select id="useYnmove" name="useYnmove" title="사용여부" style={{textAlign: "center"}} defaultValue={item.useYn}
									onChange={e => {
                                        searchUseYn = e.target.value;
                                        // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                    }}
								>
									<option value="P">사용</option>
									<option value="S">미사용</option>
								</select>
							</div>
							<div>{item.sbscrbDe}</div>
							<div>{item.authorNm}</div>
						</div>
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

	const oncheckAll = (bool, data) => {
		var list = data.listTag
		var chk
		for(var i = 0; i < list.length; i++) {
			chk = document.getElementById(list[i].key)
			if(bool) {
				chk.checked = true
			} else {
				chk.checked = false
			}
		}
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
						<li>사용자관리</li>
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
							<h1 className="tit_1">사용자관리</h1>
						</div>

						<h2 className="tit_2">
							사용자관리
							<Link to={URL.ADMIN_USER_CREATE} className="btn btn_blue_h46 pd35" style={{float: "right"}}>등록</Link>
						</h2>
						
						{/* <!--// 검색조건 --> */}
						<div className="condition">
                            <ul style={{display: "flex", marginBottom: "15px"}}>
                                <li className="third_1 L">
									<span className="lb">권한</span>
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" title="권한" defaultValue={searchCondition.searchCnd}
                                            onChange={e => {
                                                searchCnd = e.target.value;
                                                // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option>전체</option>
                                            <option value="A">A</option>
                                            <option value="U">U</option>
                                        </select>
                                    </label>
                                </li>

                                <li className="third_1 L">
									<span className="lb">사용여부</span>
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" title="사용여부" defaultValue={searchCondition.searchUseYn}
                                            onChange={e => {
                                                searchUseYn = e.target.value;
                                                // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option>전체</option>
                                            <option value="P">사용</option>
                                            <option value="S">미사용</option>
                                        </select>
                                    </label>
                                </li>
                            </ul>
							<ul style={{display: "flex"}}>
								<li className="third_2 R">
									<span className="lb">검색조건</span>
									<label className="f_select" htmlFor="sel1" style={{marginRight:"10px"}}>
                                        <select id="sel1" title="사용여부" defaultValue={searchCondition.searchSrch}
                                            onChange={e => {
                                                searchSrch = e.target.value;
                                                // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option>전체</option>
                                            <option value="1">ID</option>
                                            <option value="2">이름</option>
                                        </select>
                                    </label>
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
                                                setSearchCondition({ ...searchCondition, pageIndex: 1, searchCnd: searchCnd, searchWrd: searchWrd, searchUseYn: searchUseYn, searchSrch: searchSrch });
                                            }}>조회</button>
                                    </span>
                                </li>
							</ul>
                        </div>
						{/* <!-- 게시판목록 --> */}
						<div className="board_list BRD009">
							<div className="head">
								<span>번호</span>
								<span><input name="checkAll" type="checkbox" title="Check All" onChange={(e)=>oncheckAll(e.target.checked,{listTag})}/></span>
								<span style={{width:"100px"}}>아아디</span>
								<span style={{width:"100px"}}>부서명</span>
								<span style={{width:"100px"}}>사용자명</span>
								<span>사용여부</span>
								<span>등록일</span>
								<span>권한</span>
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

export default EgovAdminUserList;