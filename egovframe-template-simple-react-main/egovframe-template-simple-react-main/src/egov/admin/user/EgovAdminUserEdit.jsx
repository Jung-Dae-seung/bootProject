import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';
import EgovSelect from 'egov/common/EgovSelect';

function EgovAdminUserEdit(props) {
    console.group("EgovAdminBoardEdit");
    console.log("[Start] EgovAdminBoardEdit ------------------------------");
    console.log("EgovAdminBoardEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminBoardEdit [history] : ", history);

    const emplyrId = history.location.state?.emplyrId || "";
    const searchCondition = history.location.state?.searchCondition;

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [userDetail, setUserDetail] = useState({});

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/com/insertUserArticleAPI.do'
                });
                break;

            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/bbs/updateBBSMasterInfAPI.do'
                });
                break;
        }
    }

	const updateUser = () => {
        const formData = new FormData();
        for (let key in userDetail) {
            formData.append(key, userDetail[key]);
            console.log("userDetail [%s] ", key, userDetail[key]);
        }

        const requestOptions = {
            method: "POST",
            headers: {
            },
            body: formData
        }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    history.push({ pathname: URL.ADMIN_USER });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
        );
    }


    useEffect(() => {
        initMode();
        return () => {
        }
    }, []);

    useEffect(() => {
        return () => {
        }
    }, [userDetail]);

    console.log("------------------------------EgovAdminBoardEdit [End]");
    console.groupEnd("EgovAdminBoardEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>사용자생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사용자관리</h1>
                        </div>

                        {modeInfo.mode === CODE.MODE_CREATE &&
                            <h2 className="tit_2">사용자 생성</h2>
                        }

                        {modeInfo.mode === CODE.MODE_MODIFY &&
                            <h2 className="tit_2">게시판 수정</h2>
                        }

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="emplyrId">사용자ID</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="emplyrId" title="" id="emplyrId" placeholder=""
                                        onChange={e => setUserDetail({ ...userDetail, emplyrId: e.target.value })}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="password">사용자 암호</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="password" title="" id="password" placeholder=""
                                        onChange={e => setUserDetail({ ...userDetail, password: e.target.value })}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="userNm">사용자이름</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="userNm" title="" id="userNm" placeholder=""
                                        onChange={e => setUserDetail({ ...userDetail, userNm: e.target.value })}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>권한<span className="req">필수</span></dt>
                                <dd>
									<label className="f_select w_130" htmlFor="schdulIpcrCode">
                                            <select
                                                id="authorNm"
                                                name="authorNm"
                                                title="권한선택"                                            
												onChange={e => setUserDetail({ ...userDetail, authorNm: e.target.value })}
												>
												<option>선택</option>
                                                <option value="A" key="A">A</option>
                                                <option value="U" key="U">U</option>
                                            </select>
                                        </label>
                                </dd>
                            </dl>
							<dl>
                                <dt><label htmlFor="bbsIntrcn">부서명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="userDeptNm" title="" id="userDeptNm" placeholder=""
                                        defaultValue={userDetail.userDeptNm}
                                        onChange={e => setUserDetail({ ...userDetail, userDeptNm: e.target.value })}
                                    />
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateUser()}>저장</button>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.ADMIN_USER} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EgovAdminUserEdit;