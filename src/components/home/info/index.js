import './index.css'

const Info = () => {
  return (
<section className="py-0 border-bottom-xs">
<h2 className='h1-responsive font-weight-bold text-center my-5'>How it works?</h2>
    <div className="container py-3">
        <div className="row">
            <div className="col-6 col-lg-3 p--15 d-flex d-block-xs text-center-xs">
                <div className="pl--10 pr--20 fs--50 line-height-1 pt--6">
                    <img width="60" height="60" src="assets/svgs/ecommerce/money_bag.svg" alt="..." />
                </div>
                <div className="my-2">
                    <h2 className = "info_title">
                        Money Back
                    </h2>
                    <p className = "info_subtitle">
                        30-days money back
                    </p>
                </div>
            </div>
            <div className="col-6 col-lg-3 p--15 d-flex d-block-xs text-center-xs border-dashed border-light bw--1 bt-0 br-0 bb-0 b--0-lg">
                <div className="pl--10 pr--20 fs--50 line-height-1 pt--6">
                    <img width="60" height="60" src="assets/svgs/ecommerce/free-delivery-truck.svg" alt="..." />
                </div>
                <div className="my-2">
                    <h2 className="info_title">
                        Free Shipping
                    </h2>
                    <p className="info_subtitle">
                        Shipping is on us
                    </p>
                </div>
            </div>
            <div className="col-6 col-lg-3 p--15 d-flex d-block-xs text-center-xs border-dashed border-light bw--1 bl-0 br-0 bb-0 b--0-lg">
                <div className="pl--10 pr--20 fs--50 line-height-1 pt--6">
                    <img width="60" height="60" src="assets/svgs/ecommerce/24-hours-phone-service.svg" alt="..." />
                </div>
                <div className="my-2">
                    <h2 className="info_title">
                        Free Support
                    </h2>
                    <p className="info_subtitle">
                        24/24 available
                    </p>
                </div>
            </div>
            <div className="col-6 col-lg-3 p--15 d-flex d-block-xs text-center-xs border-dashed border-light bw--1 bb-0 br-0 b--0-lg">
                <div className="pl--10 pr--20 fs--50 line-height-1 pt--6">
                    <img width="60" height="60" src="assets/svgs/ecommerce/handshake.svg" alt="..." />
                </div>
                <div className="my-2">
                    <h2 className="info_title">
                        Best Deal
                    </h2>
                    <p className="info_subtitle">
                        Quality guaranteed
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
  );
}

export default Info;

