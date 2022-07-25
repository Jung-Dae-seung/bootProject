import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';
import EgovSelect from 'egov/common/EgovSelect';

function EgovAdminUserData(props) {
    console.group("EgovAdminUserData");
    console.log("[Start] EgovAdminUserData ------------------------------");
    console.log("EgovAdminUserData [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminUserData [history] : ", history);

    const emplyrId = history.location.state?.emplyrId || "";
    const searchCondition = history.location.state?.searchCondition;

    const [userDetail, setUserDetail] = useState({});

    const retrieveDetail = () => {

        const retrieveDetailURL = '/cop/com/selectUserInfAPI.do';
		console.log(emplyrId);
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
			body: JSON.stringify({
                emplyrId: emplyrId
            })
        }

        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
				console.log(resp);
                setUserDetail(resp.result.userVO);
            }
        );
    }

	const updateUser = () => {
        const formData = new FormData();
        for (let key in userDetail) {
            formData.append(key, userDetail[key]);
            console.log("userDetail [%s] ", key, userDetail[key]);
        }

		const retrieveDetailURL = '/cop/com/';
		
        const requestOptions = {
            method: "POST",
            headers: {
            },
            body: formData
        }

        EgovNet.requestFetch(retrieveDetailURL,
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
        return () => {
        }
    }, [userDetail]);

	useEffect(() => {
        retrieveDetail(searchCondition);
        return () => {
        }
    }, [searchCondition]);

    console.log("------------------------------EgovAdminUserData [End]");
    console.groupEnd("EgovAdminUserData");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>사용자수정 관리</li>
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
                            <h1 className="tit_1">사용자수정</h1>
                        </div>

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

export default EgovAdminUserData;