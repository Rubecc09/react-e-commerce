const About = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="/src/assets/images/about.jpg"
            className="img-fluid rounded shadow"
            alt="About Us"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">About Our Kiwi</h2>
          <p className="text-muted mt-3">
            Welcome to Kiwi, your one-stop shop for everything you need. From
            electronics to fashion, accessories and beyond, we bring it all together
            in one place so you can shop smarter, not harder.
          </p>
          <p className="text-muted">
            Founded in 2026, Kiwi was built on a simple belief: shopping should be
            easy, affordable, and enjoyable. What started as a small idea has grown
            into a store that has something for everyone, because at Kiwi, we've
            got you covered.
          </p>
          <button className="btn btn-primary px-4 py-2">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;