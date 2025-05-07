import "./HomePage.scss";

function HomePage() {
  return (
    <main className="homepageContainer">
      <section className="firstSection">
        <article>
          <h2 className="sectionTitle">
            Un controle parfait de vos stocks grâce à StockOps.
          </h2>
          <div className="sectionParagraph">
            <p className="firstParagraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              illum pariatur est provident, officiis dignissimos.
            </p>
            <p className="secondParagraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              cum atque perferendis velit at delectus.
            </p>
          </div>
        </article>
        <img src="/picture1.webp" alt="" className="sectionPicture" />
      </section>
      <section className="secondSection">
        <article>
          <h2 className="sectionTitle">
            Pourquoi choisir StockOps ?
          </h2>
          <div className="sectionParagraph">
            <p className="firstParagraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              illum pariatur est provident, officiis dignissimos.
            </p>
            <p className="secondParagraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              cum atque perferendis velit at delectus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos consectetur totam m
            </p>
          </div>
        </article>
        <img src="/picture2.webp" alt="" className="sectionPicture" />
      </section>
    </main>
  );
}

export default HomePage;
