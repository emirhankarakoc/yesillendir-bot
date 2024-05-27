const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
// Dynamically import node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GITHUB_TOKEN = "GITHUB_TOKENINIZI_YAZIN_TIRNAKLARIN_ICERISINDE_OLMALI";
const REPO = "emirhankarakoc/yesillendir-3";
const BRANCH = "main";
const FILE_PATH = "./data.json";
//buradaki commit countu tirnaklarin icerisine almaniza gerek yok. almayin da. alirsaniz metin olur. bize sayi lazim.
const COMMIT_COUNT = 100;

const makeCommit = async (n) => {
  const { default: random } = await import("random");

  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54);
    const y = random.int(0, 6);

    const DATE = moment()
      .subtract(2, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = {
      date: DATE,
    };

    await jsonfile.writeFile(FILE_PATH, data);
    const git = simpleGit();

    // Dosyayı add, commit ve push işlemleri
    await git.add([FILE_PATH]);
    await git.commit("github-green-dots-hack-by-@emirhankarakoc", [FILE_PATH], {
      "--date": DATE,
    });
    console.log("commit attim");
  }
};

const push = async () => {
  const git = simpleGit();
  // Push işlemi için GitHub API kullanımı
  const remote = `https://${GITHUB_TOKEN}@github.com/${REPO}.git`;
  console.log("pushlayacagim");
  await git.push(remote, BRANCH);
};

const run = async () => {
  try {
    await makeCommit(COMMIT_COUNT);
    await push();
    console.log("Push işlemi başarılı!");
  } catch (error) {
    console.error("Push işlemi başarısız:", error);
  }
};

run();
