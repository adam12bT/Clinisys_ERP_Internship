//package com.csys.parametrage;
//
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//import org.openqa.selenium.By;
//import org.openqa.selenium.chrome.ChromeDriver;
//
//import java.util.Objects;
//import java.util.concurrent.TimeUnit;
//
//import static org.junit.Assert.assertTrue;
//
//public class SeleniumTest {
//    private static ChromeDriver driver;
//    private String baseUrl;
//
//    @Before
//    public void setUp() throws Exception {
//        System.setProperty("webdriver.chrome.driver", "C:\\chromedriver.exe");
//        driver = new ChromeDriver();
//        baseUrl = "http://192.168.0.131/CliniSys/";
//        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
//    }
//
//    @Test
//    public void authentification() throws Exception {
//        try {
//            driver.manage().window().maximize();
//            driver.navigate().to(baseUrl);
//            Thread.sleep(3000);
//
//            //Authentification
//            driver.findElement(By.id("username")).sendKeys("a");
//            driver.findElement(By.id("password")).sendKeys("a");
//            driver.findElement(By.id("submit")).click();
//            Thread.sleep(3000);
//
//            //Module Parametrage
//            driver.findElements(By.id("0")).get(0).click();
//            Thread.sleep(5000);
//
//            //Menu Prestation
//            driver.findElements(By.xpath("//a[@class='menu'][@adresse='prestation']")).get(0).click();
//            Thread.sleep(5000);
//
//            //Menu Sous-Prestation
//            driver.findElements(By.xpath("//a[@id='famillePrestation']")).get(0).click();
//            Thread.sleep(5000);
//
//            //Bouton ajouter
//            driver.findElements(By.xpath("//a[contains(@class,'btn-add')]")).get(0).click();
//            Thread.sleep(5000);
//
//            //Remplir formulaire
//            Integer nombreInitial = driver.findElement(By.xpath("//table[@id='_grid_ListFamillePrestation']")).findElement(By.tagName("tbody")).findElements(By.tagName("tr")).size();
//            driver.findElement(By.xpath("//div[@id='codeTypePrestationFamille']")).findElement(By.xpath("//span[@class='select-arrow']")).click();
//            driver.findElement(By.xpath("//table[@id='tableSelect_codeTypePrestationFamille']")).findElement(By.xpath("//tr[@numero='2']")).click();
//            driver.findElement(By.xpath("//input[@id='prefixe']")).sendKeys("P");
//            driver.findElement(By.xpath("//input[@id='designationEn']")).sendKeys("designationEn");
//            driver.findElement(By.xpath("//input[@id='designationAr']")).sendKeys("تسمية");
//            Thread.sleep(3000);
//
//            //Valider ajout
//            driver.findElements(By.xpath("//a[@id='btnValiderFamillePrestation']")).get(0).click();
//            Thread.sleep(3000);
//
//            Integer nombreFinal = driver.findElement(By.xpath("//table[@id='_grid_ListFamillePrestation']")).findElement(By.tagName("tbody")).findElements(By.tagName("tr")).size();
//
//            assertTrue("Erreur d'ajout", Objects.equals(nombreInitial + 1, nombreFinal));
//
//            Thread.sleep(15000);
//        } catch (Exception e) {
//            System.out.println("catch");
//        }
//    }
//
//    @After
//    public void tearDown() throws Exception {
//        driver.quit();
//    }
//}
