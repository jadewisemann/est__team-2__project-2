class MainFooter extends HTMLElement{
    constructor(parameters) {
        super()
    }
    connectedCallback(){
        this.render()
    }
    render(){
        const footer_content_url = 'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=220-88-38020'
        const footer_content_email = 'helpdesk@wavve.com'
        this.innerHTML = `
        <footer>
            <div>
                Content Video Co., Ltd. CEO Taehyun Lee Customer Center 1599-3709 (Weekdays 09:00-18:00 / Lunchtime 12:00-13:00 / Closed on weekends and public holidays)  <br>
                Business Registration Number 220-88-38020 Hosting Service Provider: Microsoft Co., Ltd., Google Cloud Korea Co., Ltd., Amazon Web Services Korea Co., Ltd.  <br>
                Mail Order Business Report Number: No. 2021-Seoul Yeongdeungpo-0585 <br>
                Mail Order Business Information Disclosure: <a href="${footer_content_url}"> ${footer_content_url}</a> <br>
                19th Floor, Post Tower, 60 Yeouinaru-ro, Yeongdeungpo-gu, Seoul E-mail Address:<a href="${footer_content_email}">${footer_content_email}</a>  <br>
                Copyright© Content Video Co., Ltd. All rights reserved.
            </div>
        </footer>
        `
    }
}
customElements.define('main-footer',MainFooter)