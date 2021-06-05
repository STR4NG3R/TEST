import { CONFIG } from "../../../config";
import { Builder, By, Key, until } from "selenium-webdriver";
import { Notes } from "../../../entity/Notes";

const newInstanceDriver = () => new Builder().forBrowser("chrome").build();
const closeInstanceDriver = (driver) => driver.quit();

export const getNotes = async () => {};

export const createNote = async (req) => {
  const { title, body } = req.params;
  let driver = newInstanceDriver();
  try {
  } catch (error) {
    return {
      error: true,
      data: [],
    };
  } finally {
    await closeInstanceDriver(driver);
  }
};

const logIn = async (req) => {
  const { email, password } = req.query;
  let driver = await newInstanceDriver();
  try {
    await driver.get(`${CONFIG.URL_TODOIST}`);
    await driver.wait(
      until.elementIsEnabled(
        driver.findElement(
          By.xpath(
            "/html/body/div/div/main/div[1]/header/nav[2]/div/ul[3]/li[1]/a"
          )
        )
      ),
      500
    );
    await driver.sleep(100);
    await driver
      .findElement(
        By.xpath(
          "/html/body/div/div/main/div[1]/header/nav[2]/div/ul[3]/li[1]/a"
        )
      )
      .click();
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.id("email"))),
      100000
    );
    driver.sleep(10);
    await driver
      .findElement(By.id("email"))
      .sendKeys(email);
    await driver
      .findElement(By.id("password"))
      .sendKeys(password, Key.RETURN);
    return { error: false, data: { message: "logged in", driver: driver } };
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  } finally {
    //await closeInstanceDriver(driver);
  }
};

export const pullRandomNotes = async (req) => {
  const driver = newInstanceDriver();
  const res = await logIn(req);

  try {
    let { numberNotes } = req.params;
    if (numberNotes === undefined) numberNotes = 10;

    const notesPerPage = 6;
    const pageToSearch = Math.ceil(numberNotes / notesPerPage);
    await driver.get(`${CONFIG.URL_RANDOMTODOLIST}`);

    await driver.wait(
      until.elementIsVisible(driver.findElement(By.className("page-item"))),
      3000
    );
    const pages = await driver.findElements(By.className("page-item"));

    let currentPage = 1,
      countTotalNotes = 1;

    let notes = [];

    do {
      await pages[currentPage].click();
      const cards = await getCards(driver);

      for (
        var i = 0;
        i < notesPerPage && countTotalNotes <= numberNotes;
        i++, countTotalNotes++
      ) {
        const text = await cards[i].getText();
        notes.push(text + " ");
      }
    } while (currentPage++ < pageToSearch);

    if (res.error) return { error: res.error, message: res.message };

    await res.data.driver.wait(
      until.elementLocated(By.css(".plus_add_button")),
      50000
    );

    const button = await res.data.driver.findElement(
      By.css(".plus_add_button")
    );
    await res.data.driver.sleep(1000);
    await button.click();

    for (let i = 0; i < notes.length; i++) {
      await res.data.driver.sleep(100);
      await res.data.driver
        .findElement(
          By.css(
            "#agenda_view > div > section > div > ul > li.manager.indent_1 > form > div.task_editor__editing_area > div.task_editor__input_fields > div > div > div > div.DraftEditor-editorContainer > div > div"
          )
        )
        .sendKeys(notes[i], Key.RETURN);

      // also is stored on DB
      const noteDB = new Notes();
      noteDB.content = { content: notes[i] };
      await noteDB.save();
    }

    return { error: false, data: notes };
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  } finally {
    closeInstanceDriver(driver);
    closeInstanceDriver(res.data.driver);
  }
};

const getCards = async (driver) => {
  await driver.wait(
    until.elementIsVisible(driver.findElement(By.className("card-body"))),
    800
  );
  return await driver.findElements(By.className("card-body"));
};
