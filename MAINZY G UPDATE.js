// ==UserScript==
// @name         @MAINZYG OFFICIAL BOT NOT 4 SALE ESball.ph Auto-Filler
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Auto-fill ESball.ph registration form with specific patterns
// @author       You
// @match        https://www.esball.ph/m/register?r=jym2362*
// @match        https://www.esball.ph/m/home*
// @match        https://www.esball.ph/m/home?r=jym2362*
// @match        https://www.esball.ph/m/home?r=jym2362&gtagId=*
// @match        https://www.esball.ph/m/myAccount/index*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Configuration - 1000+ different 6-letter names
    const config = {
        password: 'Mainzy25', // Fixed password as requested (kept but will be overridden per-username)
        sixLetterNames: [
            'Sophia', 'Olivia', 'Emma', 'Ava', 'Isabella', 'Mia', 'Zoe', 'Lily', 'Emily', 'Chloe',
            'Layla', 'Madison', 'Grace', 'Zoey', 'Nora', 'Hannah', 'Lily', 'Avery', 'Ella', 'Scarlett',
            'Aria', 'Riley', 'Amelia', 'Nova', 'Addison', 'Luna', 'Brook', 'Bella', 'Lucy', 'Paisley',
            'Everly', 'Skylar', 'Ellie', 'Natalie', 'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey',
            'Brooklyn', 'Bella', 'Claire', 'Anna', 'Kinsley', 'Allison', 'Samantha', 'Natalia', 'Sarah', 'Camila',
            'Genesis', 'Kennedy', 'Sadie', 'Aaliyah', 'Gabriel', 'Elena', 'Naomi', 'Alice', 'Sara', 'Ruby',
            'Emery', 'Lydia', 'Clara', 'Vivian', 'Reagan', 'Mackenzie', 'Madelyn', 'Katherine', 'Kaylee', 'Sophie',
            'Alexis', 'Haley', 'Taylor', 'Ashley', 'Brianna', 'Charlotte', 'Rebecka', 'Teagan', 'Dakota', 'Maya',
            'Melanie', 'Gianna', 'Alexa', 'Kylie', 'Cora', 'Julia', 'Kaitlyn', 'Faith', 'Alexandra', 'Jasmine',
            'Ariana', 'Isabelle', 'Morgan', 'Eva', 'Kimberly', 'Lauren', 'Bailey', 'Jennifer', 'Makayla', 'Lilly',
            'Jena', 'Destiny', 'Amy', 'Paige', 'Maria', 'Brooke', 'Mckenzie', 'Nicole', 'Trinity', 'Kendall',
            'Adeline', 'Alexia', 'Alyssa', 'Amaya', 'Angela', 'Annabel', 'Ariel', 'Ashlyn', 'Bethany', 'Brielle',
            'Cadence', 'Caitlin', 'Callie', 'Carmen', 'Caroline', 'Cassidy', 'Catherine', 'Cecilia', 'Celeste', 'Chelsea',
            'Cheyenne', 'Clarissa', 'Daisy', 'Dakota', 'Daniela', 'Danielle', 'Daphne', 'Delaney', 'Delilah', 'Destinee',
            'Diana', 'Eleanor', 'Eliana', 'Elise', 'Eliza', 'Elizabeth', 'Ella', 'Elliana', 'Elliot', 'Elodie',
            'Eloise', 'Emelia', 'Emerson', 'Emersyn', 'Emery', 'Emilia', 'Emily', 'Emma', 'Emmaline', 'Emmalyn',
            'Emmeline', 'Erica', 'Erin', 'Eva', 'Evelyn', 'Faith', 'Fatima', 'Fiona', 'Gabriela', 'Gabriella',
            'Gabrielle', 'Genevieve', 'Georgia', 'Gianna', 'Giselle', 'Grace', 'Gracie', 'Guadalupe', 'Gwendolyn', 'Hadley',
            'Hailey', 'Haley', 'Hannah', 'Harley', 'Harmony', 'Harper', 'Hazel', 'Heather', 'Heaven', 'Heidi',
            'Helen', 'Isabel', 'Isabella', 'Isabelle', 'Ivy', 'Jacqueline', 'Jada', 'Jade', 'Jasmine', 'Jayla',
            'Jayleen', 'Jaylene', 'Jazlyn', 'Jazmin', 'Jenna', 'Jennifer', 'Jessica', 'Jillian', 'Joanna', 'Jocelyn',
            'Jordyn', 'Josie', 'Journey', 'Joy', 'Julia', 'Juliana', 'Julianna', 'Julie', 'Juliet', 'Juliette',
            'June', 'Juniper', 'Kaitlyn', 'Kali', 'Kaliyah', 'Kallie', 'Kamila', 'Kara', 'Karen', 'Karina',
            'Karla', 'Katelyn', 'Katherine', 'Kathleen', 'Kathryn', 'Katie', 'Kayla', 'Kaylee', 'Kayleigh', 'Keira',
            'Kelsey', 'Kendall', 'Kendra', 'Kenzie', 'Keyla', 'Khloe', 'Kiana', 'Kiara', 'Kiera', 'Kiley',
            'Kimberly', 'Kinsley', 'Kira', 'Kora', 'Kylee', 'Kyleigh', 'Kylie', 'Laila', 'Lana', 'Laney',
            'Laura', 'Lauren', 'Layla', 'Lea', 'Leah', 'Leanna', 'Legacy', 'Leia', 'Leila', 'Lena',
            'Leona', 'Leslie', 'Lexi', 'Lexie', 'Leyla', 'Lia', 'Lila', 'Lilian', 'Liliana', 'Lillian',
            'Lilliana', 'Lillie', 'Lilly', 'Lily', 'Lina', 'Linda', 'Lindsay', 'Lindsey', 'Lisa', 'Liv',
            'Livia', 'Lizbeth', 'Lola', 'London', 'Londyn', 'Lorelai', 'Lorelei', 'Lucia', 'Luciana', 'Lucille',
            'Lucy', 'Luisa', 'Luna', 'Lyric', 'Mabel', 'Mackenzie', 'Macy', 'Madalyn', 'Maddison', 'Madeleine',
            'Madeline', 'Madelyn', 'Madelynn', 'Madilyn', 'Madison', 'Madisyn', 'Mae', 'Maeve', 'Magdalena', 'Maggie',
            'Makayla', 'Makenna', 'Makenzie', 'Malani', 'Malaya', 'Maliah', 'Maliyah', 'Margaret', 'Margo', 'Margot',
            'Maria', 'Mariah', 'Mariam', 'Mariana', 'Marianna', 'Marie', 'Marilyn', 'Marina', 'Marlee', 'Marley',
            'Martha', 'Mary', 'Mateo', 'Matilda', 'Maverick', 'Maya', 'Mckenna', 'Mckenzie', 'Meadow', 'Megan',
            'Meghan', 'Melany', 'Melina', 'Melissa', 'Melody', 'Mercy', 'Mia', 'Michelle', 'Mikaela', 'Mila',
            'Milan', 'Milana', 'Milena', 'Miley', 'Millie', 'Mira', 'Miranda', 'Miriam', 'Molly', 'Monica',
            'Morgan', 'Mya', 'Nadia', 'Nala', 'Nancy', 'Naomi', 'Natalia', 'Natalie', 'Natasha', 'Navy',
            'Nayeli', 'Nevaeh', 'Nia', 'Nicole', 'Noelle', 'Noemi', 'Nola', 'Nora', 'Norah', 'Nova',
            'Novah', 'Nyla', 'Rachel', 'Raegan', 'Raelyn', 'Raina', 'Ramona', 'Raquel', 'Raven', 'Raya',
            'Reagan', 'Rebecca', 'Rebekah', 'Reese', 'Regina', 'Reign', 'Reina', 'Remi', 'Remington', 'Remy',
            'Renata', 'Reyna', 'Rhea', 'Riley', 'River', 'Rivka', 'Rosalie', 'Rosalyn', 'Rose', 'Roselyn',
            'Rosemary', 'Rowan', 'Ruby', 'Ruth', 'Ryan', 'Rylan', 'Rylee', 'Ryleigh', 'Sabrina', 'Sadie',
            'Sage', 'Saige', 'Salma', 'Samantha', 'Samara', 'Samira', 'Sandra', 'Sara', 'Sarah', 'Sarai',
            'Sariah', 'Sasha', 'Savanna', 'Savannah', 'Sawyer', 'Saylor', 'Scarlet', 'Scarlett', 'Selah', 'Selena',
            'Selene', 'Serena', 'Serenity', 'Shiloh', 'Siena', 'Sierra', 'Simone', 'Skye', 'Skyla', 'Skylar',
            'Sloan', 'Sloane', 'Sofia', 'Sophia', 'Sophie', 'Stella', 'Stephanie', 'Stevie', 'Summer', 'Sunny',
            'Sutton', 'Sydney', 'Sylvia', 'Talia', 'Tatiana', 'Tatum', 'Taylor', 'Teagan', 'Tessa', 'Thalia',
            'Thea', 'Tiana', 'Tiffany', 'Tori', 'Treasure', 'Trinity', 'Vada', 'Valentina', 'Valeria', 'Valerie',
            'Vanessa', 'Veda', 'Vera', 'Veronica', 'Victoria', 'Vienna', 'Violet', 'Virginia', 'Vivian', 'Viviana',
            'Vivienne', 'Willa', 'Willow', 'Winter', 'Wren', 'Ximena', 'Yara', 'Yareli', 'Yaretzi', 'Zahra',
            'Zara', 'Zaria', 'Zariah', 'Zariyah', 'Zaylee', 'Zelda', 'Zoe', 'Zoey', 'Zoie', 'Zuri',
            'Aaliyah', 'Abagail', 'Abbey', 'Abbie', 'Abbigail', 'Abby', 'Abigail', 'Abrielle', 'Abril', 'Addilyn',
            'Addison', 'Addisyn', 'Addyson', 'Adelaide', 'Adele', 'Adelina', 'Adeline', 'Adelynn', 'Adley', 'Adriana',
            'Adrianna', 'Adrienne', 'Aila', 'Ailani', 'Aileen', 'Ainsley', 'Aisha', 'Aitana', 'Aiyana', 'Alaina',
            'Alana', 'Alani', 'Alanna', 'Alaya', 'Alayah', 'Alayna', 'Aleah', 'Aleena', 'Alejandra', 'Alena',
            'Alessandra', 'Alessia', 'Alexa', 'Alexandra', 'Alexandria', 'Alexia', 'Alexis', 'Alexus', 'Ali', 'Alia',
            'Aliana', 'Alianna', 'Alice', 'Alicia', 'Alina', 'Alison', 'Alivia', 'Aliya', 'Aliyah', 'Aliza',
            'Allie', 'Allison', 'Allyson', 'Alma', 'Alondra', 'Alyson', 'Alyssa', 'Amaia', 'Amalia', 'Amanda',
            'Amani', 'Amara', 'Amari', 'Amaris', 'Amaya', 'Amber', 'Amelia', 'Amelie', 'Amina', 'Amira',
            'Amirah', 'Amiyah', 'Amora', 'Amy', 'Ana', 'Anahi', 'Anais', 'Analia', 'Anastasia', 'Anaya',
            'Andi', 'Andrea', 'Angel', 'Angela', 'Angelica', 'Angelina', 'Angeline', 'Angelique', 'Angie', 'Anika',
            'Aniya', 'Aniyah', 'Ann', 'Anna', 'Annabel', 'Annabella', 'Annabelle', 'Annalee', 'Annalise', 'Anne',
            'Annie', 'Annika', 'Ansley', 'Antonella', 'Antonia', 'Anya', 'April', 'Arabella', 'Arden', 'Arely',
            'Ari', 'Aria', 'Ariadne', 'Ariah', 'Ariana', 'Arianna', 'Ariel', 'Ariella', 'Arielle', 'Ariya',
            'Ariyah', 'Arlette', 'Armani', 'Arya', 'Ashanti', 'Ashlee', 'Ashley', 'Ashly', 'Ashlyn', 'Ashlynn',
            'Aspen', 'Astrid', 'Athena', 'Aubree', 'Aubrey', 'Aubrie', 'Aubriella', 'Aubrielle', 'Audrey', 'Audrina',
            'August', 'Aurelia', 'Aurora', 'Autumn', 'Ava', 'Avah', 'Avalyn', 'Averi', 'Averie', 'Avery',
            'Aviana', 'Avianna', 'Aya', 'Ayla', 'Ayleen', 'Aylin', 'Azalea', 'Azaria', 'Azariah', 'Bailee',
            'Bailey', 'Barbara', 'Baylee', 'Beatrice', 'Belen', 'Bella', 'Bellamy', 'Belle', 'Berkley', 'Bethany',
            'Bexley', 'Bianca', 'Blair', 'Blaire', 'Blake', 'Blakely', 'Blanca', 'Bonnie', 'Braelyn', 'Braelynn',
            'Braylee', 'Bria', 'Briana', 'Brianna', 'Briar', 'Bridget', 'Bridgette', 'Briella', 'Brielle', 'Brinley',
            'Bristol', 'Brittany', 'Brooke', 'Brooklyn', 'Brooklynn', 'Brylee', 'Bryleigh', 'Brynlee', 'Brynleigh', 'Brynn',
            'Cadence', 'Caitlin', 'Caitlyn', 'Caleigh', 'Cali', 'Callie', 'Calliope', 'Cameron', 'Camila', 'Camilla',
            'Camille', 'Camryn', 'Candace', 'Candice', 'Cara', 'Carla', 'Carly', 'Carmen', 'Carol', 'Carolina',
            'Caroline', 'Carolyn', 'Cassandra', 'Cassidy', 'Cassie', 'Cataleya', 'Catherine', 'Caylee', 'Cecelia', 'Cecilia',
            'Celeste', 'Celestine', 'Celia', 'Celine', 'Chana', 'Chandler', 'Chanel', 'Channing', 'Charlee', 'Charleigh',
            'Charley', 'Charli', 'Charlie', 'Charlotte', 'Chase', 'Chaya', 'Chelsea', 'Cheyenne', 'Chloe', 'Christina',
            'Christine', 'Claire', 'Clara', 'Clare', 'Clarissa', 'Claudia', 'Clementine', 'Colette', 'Collins', 'Cora',
            'Coraline', 'Corinne', 'Crystal', 'Cynthia', 'Dahlia', 'Daisy', 'Dakota', 'Dalary', 'Daleyza', 'Dallas',
            'Dana', 'Dani', 'Daniela', 'Daniella', 'Danielle', 'Danna', 'Daphne', 'Darcy', 'Daria', 'Darlene',
            'Davina', 'Dawn', 'Dayana', 'Deanna', 'Deborah', 'Delaney', 'Delilah', 'Della', 'Demi', 'Denise',
            'Desiree', 'Destinee', 'Destiny', 'Diana', 'Diane', 'Dior', 'Dixie', 'Dolly', 'Dolores', 'Dominique',
            'Dream', 'Dulce', 'Dylan', 'Eden', 'Edith', 'Edna', 'Eileen', 'Elaina', 'Elaine', 'Eleanor',
            'Elena', 'Eliana', 'Elianna', 'Elin', 'Elisa', 'Elisabeth', 'Elise', 'Eliza', 'Elizabeth', 'Ella',
            'Elle', 'Ellen', 'Elliana', 'Ellianna', 'Ellie', 'Elliot', 'Elliott', 'Ellis', 'Ellison', 'Elodie',
            'Eloise', 'Elora', 'Elsa', 'Elsie', 'Elspeth', 'Ember', 'Emberly', 'Emely', 'Emerie', 'Emerson',
            'Emersyn', 'Emery', 'Emilee', 'Emilia', 'Emilie', 'Emily', 'Emma', 'Emmaline', 'Emmalyn', 'Emmalynn',
            'Emmeline', 'Emmie', 'Emmy', 'Emory', 'Erica', 'Erin', 'Esme', 'Esmeralda', 'Estella', 'Estelle',
            'Esther', 'Estrella', 'Etta', 'Eva', 'Evangeline', 'Eve', 'Evelyn', 'Everlee', 'Everleigh', 'Everly',
            'Evie', 'Ezra', 'Faith', 'Fallon', 'Fanny', 'Fatima', 'Faye', 'Felicity', 'Fernanda', 'Finley',
            'Fiona', 'Flora', 'Florence', 'Frances', 'Francesca', 'Frankie', 'Freya', 'Frida', 'Gabriela', 'Gabriella',
            'Gabrielle', 'Galilea', 'Gemma', 'Genesis', 'Genevieve', 'Georgia', 'Georgina', 'Gia', 'Giana', 'Gianna',
            'Gigi', 'Giselle', 'Giuliana', 'Gloria', 'Grace', 'Gracelyn', 'Gracelynn', 'Gracie', 'Greta', 'Gretchen',
            'Guadalupe', 'Gwen', 'Gwendolyn', 'Hadassah', 'Hadlee', 'Hadleigh', 'Hadley', 'Hailey', 'Haisley', 'Haley',
            'Halle', 'Hallie', 'Hana', 'Hanna', 'Hannah', 'Harlee', 'Harley', 'Harlow', 'Harmoni', 'Harmony',
            'Harper', 'Harriet', 'Hattie', 'Haven', 'Hayden', 'Haylee', 'Hayley', 'Hazel', 'Heather', 'Heaven',
            'Heidi', 'Helen', 'Helena', 'Henley', 'Holland', 'Holly', 'Hope', 'Hunter', 'Iliana', 'Imani',
            'India', 'Indie', 'Indigo', 'Irene', 'Iris', 'Isabel', 'Isabela', 'Isabella', 'Isabelle', 'Isla',
            'Itzel', 'Ivana', 'Ivanna', 'Ivory', 'Ivy', 'Izabella', 'Jacqueline', 'Jada', 'Jade', 'Jaden',
            'Jadyn', 'Jaelyn', 'Jaelynn', 'Jaliyah', 'Jamie', 'Jana', 'Jane', 'Janelle', 'Janessa', 'Janiyah',
            'Jasmine', 'Jaycee', 'Jayda', 'Jayde', 'Jayden', 'Jayla', 'Jaylah', 'Jaylee', 'Jayleen', 'Jaylene',
            'Jazlyn', 'Jazmin', 'Jazmine', 'Jemma', 'Jenesis', 'Jenna', 'Jennifer', 'Jessica', 'Jessie', 'Jewel',
            'Jill', 'Jillian', 'Jimena', 'Joanna', 'Jocelyn', 'Joelle', 'Johanna', 'Jolene', 'Jolie', 'Jordan',
            'Jordyn', 'Joselyn', 'Josephine', 'Josie', 'Journee', 'Journey', 'Journi', 'Jovie', 'Joy', 'Joyce',
            'Juanita', 'Judith', 'Julia', 'Juliana', 'Julianna', 'Julie', 'Juliet', 'Julieta', 'Juliette', 'Julissa',
            'June', 'Juniper', 'Jurnee', 'Justice', 'Kadence', 'Kaelyn', 'Kai', 'Kaia', 'Kailani', 'Kailey',
            'Kailyn', 'Kairi', 'Kaitlyn', 'Kaiya', 'Kalani', 'Kali', 'Kalia', 'Kaliyah', 'Kallie', 'Kamila',
            'Kamilah', 'Kamiyah', 'Kamryn', 'Kara', 'Karen', 'Karina', 'Karla', 'Karlee', 'Karsyn', 'Karter',
            'Kassidy', 'Kate', 'Katelyn', 'Katherine', 'Kathleen', 'Kathryn', 'Katie', 'Kaydence', 'Kayla', 'Kaylani',
            'Kaylee', 'Kayleigh', 'Kaylie', 'Kaylin', 'Kehlani', 'Keira', 'Kelly', 'Kelsey', 'Kendall', 'Kendra',
            'Kenley', 'Kenna', 'Kennedi', 'Kennedy', 'Kensley', 'Kenzie', 'Keyla', 'Khaleesi', 'Khloe', 'Kiana',
            'Kiara', 'Kiera', 'Kierra', 'Kiersten', 'Kiley', 'Kimber', 'Kimberly', 'Kimora', 'Kinslee', 'Kinsley',
            'Kira', 'Kora', 'Kori', 'Kylee', 'Kyleigh', 'Kylie', 'Kynlee', 'Kyra', 'Lacey', 'Laila',
            'Lainey', 'Lana', 'Landry', 'Lane', 'Laney', 'Lara', 'Larissa', 'Laura', 'Laurel', 'Lauren',
            'Lauryn', 'Layla', 'Laylah', 'Lea', 'Leah', 'Leanna', 'Legacy', 'Leia', 'Leighton', 'Leila',
            'Leilani', 'Lena', 'Lennon', 'Lennox', 'Leona', 'Leslie', 'Lexi', 'Lexie', 'Leyla', 'Lia',
            'Liana', 'Liberty', 'Lila', 'Lilah', 'Lilian', 'Liliana', 'Lilianna', 'Lilith', 'Lillian', 'Lilliana',
            'Lillie', 'Lilly', 'Lily', 'Lina', 'Linda', 'Lindsay', 'Lindsey', 'Liora', 'Lisa', 'Liv',
            'Livia', 'Lizbeth', 'Logan', 'Lola', 'London', 'Londyn', 'Lorelai', 'Lorelei', 'Loretta', 'Louisa',
            'Louise', 'Luca', 'Lucia', 'Luciana', 'Lucille', 'Lucy', 'Luella', 'Luna', 'Lyanna', 'Lydia',
            'Lyla', 'Lylah', 'Lyra', 'Lyric', 'Mabel', 'Maci', 'Macie', 'Mackenzie', 'Macy', 'Madalyn',
            'Maddison', 'Madeleine', 'Madeline', 'Madelyn', 'Madelynn', 'Madilyn', 'Madison', 'Madisyn', 'Mae', 'Maeve',
            'Magdalena', 'Maggie', 'Maia', 'Maisie', 'Makayla', 'Makenna', 'Makenzie', 'Malani', 'Malaya', 'Malayah',
            'Malaysia', 'Maleah', 'Malia', 'Maliah', 'Malina', 'Maliyah', 'Mallory', 'Mara', 'Marcella', 'Maren',
            'Margaret', 'Margot', 'Maria', 'Mariah', 'Mariam', 'Mariana', 'Marianna', 'Marie', 'Marilyn', 'Marina',
            'Marlee', 'Marleigh', 'Marley', 'Marlowe', 'Martha', 'Mary', 'Maryam', 'Matilda', 'Mavis', 'Maxine',
            'Maya', 'Mckenna', 'Mckenzie', 'Meadow', 'Megan', 'Meghan', 'Meilani', 'Melani', 'Melanie', 'Melany',
            'Melina', 'Melissa', 'Melody', 'Mercy', 'Meredith', 'Mia', 'Micah', 'Michaela', 'Michelle', 'Mikaela',
            'Mikayla', 'Mila', 'Milana', 'Milani', 'Milena', 'Miley', 'Millie', 'Mina', 'Mira', 'Miracle',
            'Miranda', 'Miriam', 'Molly', 'Monica', 'Monroe', 'Morgan', 'Mya', 'Myla', 'Mylah', 'Myra',
            'Nadia', 'Nala', 'Nalani', 'Nancy', 'Naomi', 'Natalia', 'Natalie', 'Natasha', 'Navy', 'Naya',
            'Nayeli', 'Nellie', 'Nevaeh', 'Nia', 'Nicole', 'Nina', 'Noa', 'Noelle', 'Noemi', 'Nola',
            'Nora', 'Norah', 'Nova', 'Novah', 'Novalee', 'Nyla', 'Nylah', 'Nyomi', 'Oakley', 'Oaklyn',
            'Oaklynn', 'Octavia', 'Olive', 'Olivia', 'Opal', 'Ophelia', 'Paige', 'Paislee', 'Paisley', 'Paloma',
            'Paola', 'Paris', 'Parker', 'Patricia', 'Paula', 'Paulina', 'Payton', 'Pearl', 'Penelope', 'Penny',
            'Perla', 'Peyton', 'Phoebe', 'Phoenix', 'Piper', 'Poppy', 'Presley', 'Princess', 'Priscilla', 'Promise',
            'Queen', 'Quinn', 'Rachel', 'Raegan', 'Raelyn', 'Raelynn', 'Raina', 'Ramona', 'Raquel', 'Raven',
            'Raya', 'Rayna', 'Rayne', 'Reagan', 'Rebecca', 'Rebekah', 'Reese', 'Regan', 'Regina', 'Reign',
            'Reina', 'Remi', 'Remington', 'Remy', 'Renata', 'Reyna', 'Rhea', 'Riley', 'Rivka', 'Robin',
            'Romina', 'Rory', 'Rosa', 'Rosalee', 'Rosalia', 'Rosalie', 'Rosalyn', 'Rose', 'Roselyn', 'Rosemary',
            'Rosie', 'Rowan', 'Ruby', 'Ruth', 'Ryan', 'Rylan', 'Rylee', 'Ryleigh', 'Rylie', 'Sabrina',
            'Sadie', 'Sage', 'Saige', 'Salma', 'Samantha', 'Samara', 'Samira', 'Sandra', 'Saoirse', 'Sara',
            'Sarah', 'Sarai', 'Sariah', 'Sariyah', 'Sasha', 'Savanna', 'Savannah', 'Sawyer', 'Saylor', 'Scarlet',
            'Scarlett', 'Selah', 'Selena', 'Selene', 'Serena', 'Serenity', 'Shayla', 'Shea', 'Shelby', 'Shiloh',
            'Siena', 'Sierra', 'Simone', 'Sky', 'Skye', 'Skyla', 'Skylar', 'Sloan', 'Sloane', 'Sofia',
            'Sophia', 'Sophie', 'Stella', 'Stephanie', 'Stevie', 'Summer', 'Sunny', 'Sutton', 'Sydney', 'Sylvia',
            'Talia', 'Taliyah', 'Tatiana', 'Tatum', 'Taylor', 'Teagan', 'Tessa', 'Thalia', 'Thea', 'Tiana',
            'Tiffany', 'Tilly', 'Timea', 'Tinsley', 'Tori', 'Treasure', 'Trinity', 'Vada', 'Valentina', 'Valeria',
            'Valerie', 'Vanessa', 'Veda', 'Vera', 'Veronica', 'Victoria', 'Vienna', 'Violet', 'Violeta', 'Virginia',
            'Vivian', 'Viviana', 'Vivienne', 'Waverly', 'Wendy', 'Whitley', 'Willa', 'Willow', 'Winter', 'Wren',
            'Wynter', 'Ximena', 'Xiomara', 'Yara', 'Yareli', 'Yaretzi', 'Yasmin', 'Zahra', 'Zainab', 'Zara',
            'Zaria', 'Zariah', 'Zariyah', 'Zayla', 'Zaylee', 'Zelda', 'Zendaya', 'Zoe', 'Zoey', 'Zoie',
            'Zola', 'Zora', 'Zuri'
        ],
        lastNames: ['Durban', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor', 'Clark', 'Lewis', 'Lee'],
        emailDomains: ['@yahoo1.com', '@gmail1.com', '@hotmail1.com', '@outlook1.com', '@mail1.com'],
        viberLength: { min: 6, max: 10 }
    };

    // Store username for account page
    let generatedUsername = '';
    let isScriptActive = true; // Control flag for start/stop
    let currentTimeout = null; // To track timeouts for cancellation
    let isScreenshotTaken = GM_getValue('screenshot_taken', false); // Track if screenshot has been marked as taken

    function generateUsername() {
        const firstName = config.sixLetterNames[Math.floor(Math.random() * config.sixLetterNames.length)];
        const randomDigits = Math.floor(Math.random() * 90 + 10); // 10-99 (always 2 digits)
        return firstName + randomDigits;
    }

    // New: generate password connected to username:
    // If username is "Celia88" -> password will be "Celia" + random 3 digits (e.g., Celia123)
    function generatePasswordFromUsername(username) {
        const namePart = username.replace(/\d+/g, '');
        const random3 = Math.floor(Math.random() * 900) + 100; // 100-999
        return namePart + random3;
    }

    function generateRealName(username) {
        const namePart = username.replace(/\d+/g, '');
        const lastName = config.lastNames[Math.floor(Math.random() * config.lastNames.length)];
        return namePart + ' ' + lastName;
    }

    function generateEmail(username) {
        const domain = config.emailDomains[Math.floor(Math.random() * config.emailDomains.length)];
        return username + domain;
    }

    function generateViberNumber() {
        const length = Math.floor(Math.random() * (config.viberLength.max - config.viberLength.min + 1)) + config.viberLength.min;
        let viber = '';
        for (let i = 0; i < length; i++) {
            viber += Math.floor(Math.random() * 10);
        }
        return viber;
    }

    function clearAllTimeouts() {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
    }

    function stopScript() {
        isScriptActive = false;
        clearAllTimeouts();
        console.log('⏹️ Script stopped manually');
        updateControlButtons();
    }

    function startScript() {
        isScriptActive = true;
        console.log('▶️ Script started manually');
        updateControlButtons();

        if (window.location.href.includes('register')) {
            waitForForm();
        } else if (window.location.href.includes('/m/myAccount/index')) {
            handleAccountPage();
        }
    }

    function toggleScript() {
        if (isScriptActive) {
            stopScript();
        } else {
            startScript();
        }
    }

    function fillESballForm() {
        if (!isScriptActive) return;

        console.log('🚀 Filling ESball registration form...');
        generatedUsername = generateUsername();
        // Password now generated from username (namePart + random 3 digits)
        const password = generatePasswordFromUsername(generatedUsername);
        const realName = generateRealName(generatedUsername);
        GM_setValue('esball_username', generatedUsername);
        GM_setValue('esball_password', password); // store password too (unchanged behavior except saving new value)

        console.log('📋 Generated data:', { Username: generatedUsername, Password: password, RealName: realName });
        fillAllFields(generatedUsername, password, realName);
    }

    function fillAllFields(username, password, realName) {
        fillFieldsByXPath(username, password, realName);
        setTimeout(() => fillFieldsByDOM(username, password, realName), 500);
    }

    function fillFieldsByXPath(username, password, realName) {
        fillFieldByXPath('//input[@name="username"]', username);
        fillFieldByXPath('//input[@placeholder="Username"]', username);
        fillFieldByXPath('//input[@name="password"]', password);
        fillFieldByXPath('//input[@placeholder="Password"]', password);
        fillFieldByXPath('//input[@name="checkPass"]', password);
        fillFieldByXPath('//input[@name="confirmPassword"]', password);
        fillFieldByXPath('//input[@name="password_confirmation"]', password);
        fillFieldByXPath('//input[@placeholder="Confirm password"]', password);
        fillFieldByXPath('//input[@placeholder="Confirm Password"]', password);
        fillFieldByXPath('//input[@name="payeeName"]', realName);
        fillFieldByXPath('//input[@placeholder="Real name"]', realName);
        fillFieldByXPath('//input[@placeholder="Real Name"]', realName);
    }

    function fillFieldsByDOM(username, password, realName) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            const name = (input.name || '').toLowerCase();
            const placeholder = (input.placeholder || '').toLowerCase();
            const type = input.type;

            if (type === 'password') {
                input.value = password;
                triggerEvents(input);
            } else if (name.includes('user') || placeholder.includes('user')) {
                input.value = username;
                triggerEvents(input);
            } else if (name.includes('check') || name.includes('confirm') || placeholder.includes('confirm') || placeholder.includes('check')) {
                input.value = password;
                triggerEvents(input);
            } else if (name.includes('payee') || name.includes('real') || placeholder.includes('real') || placeholder.includes('name')) {
                input.value = realName;
                triggerEvents(input);
            }
        });
    }

    function handleAccountPage() {
        if (!isScriptActive) return;

        console.log('📊 Account page detected, filling details...');
        const username = GM_getValue('esball_username', generateUsername());
        const email = generateEmail(username);
        const viber = generateViberNumber();

        console.log('📋 Account details:', { Username: username, Email: email, Viber: viber });

        currentTimeout = setTimeout(() => {
            if (!isScriptActive) return;

            const emailField = document.querySelector('input[name="email"]') ||
                              document.querySelector('input[placeholder*="email"]') ||
                              document.querySelector('input[placeholder*="Email"]');
            if (emailField) {
                emailField.value = email;
                triggerEvents(emailField);
                console.log('✅ Email field filled');
            }

            const viberField = document.querySelector('input[name="viber"]') ||
                               document.querySelector('input[placeholder*="viber"]') ||
                               document.querySelector('input[placeholder*="Viber"]');
            if (viberField) {
                viberField.value = viber;
                triggerEvents(viberField);
                console.log('✅ Viber field filled');
            }

            currentTimeout = setTimeout(() => {
                if (isScriptActive) {
                    clickSubmitButton();
                }
            }, 500);
        }, 1500);
    }

    function fillFieldByXPath(xpath, value) {
        try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (result.singleNodeValue) {
                result.singleNodeValue.value = value;
                triggerEvents(result.singleNodeValue);
                console.log(`✅ Filled field via XPath: ${xpath}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error with XPath:', xpath, error);
            return false;
        }
    }

    function clickSubmitButton() {
        if (!isScriptActive) return;

        const buttonSelectors = [
            "a.btn-success.am-button",
            "button[type='submit']",
            "input[type='submit']",
            "a[role='button']"
        ];

        for (const selector of buttonSelectors) {
            const buttons = document.querySelectorAll(selector);
            for (const button of buttons) {
                const buttonText = button.textContent.toLowerCase();
                if (buttonText.includes('submit') || button.type === 'submit') {
                    console.log('✅ Clicking submit button...');
                    button.click();
                    stopScript();
                    return true;
                }
            }
        }

        const buttonXpath = "//a[contains(@class, 'btn-success') and contains(@class, 'am-button')]";
        try {
            const button = document.evaluate(buttonXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (button) {
                console.log('✅ Clicking submit button via XPath...');
                button.click();
            }
        } catch (error) {
            console.error('XPath button error:', error);
        }

        console.log('❌ Submit button not found');
        return false;
    }

    function triggerEvents(element) {
        ['input', 'change', 'blur'].forEach(eventType => {
            element.dispatchEvent(new Event(eventType, { bubbles: true }));
        });
    }

    function createStatusMessage(text, color) {
        const status = document.createElement('div');
        status.textContent = text;
        status.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 9998;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(status);
        setTimeout(() => { if (status.parentNode) status.parentNode.removeChild(status); }, 3000);
    }

    function updateControlButtons() {
        const toggleBtn = document.getElementById('esball-toggle-btn');
        const autoFillBtn = document.getElementById('esball-auto-fill-btn');
        const bindEmailBtn = document.getElementById('esball-bind-email-btn');
        const screenshotBtn = document.getElementById('esball-screenshot-btn');

        if (toggleBtn) {
            toggleBtn.textContent = isScriptActive ? '⏹️ Stop Script' : '▶️ Start Script';
            toggleBtn.style.background = isScriptActive ?
                'linear-gradient(45deg, #FF6B6B, #C0392B)' :
                'linear-gradient(45deg, #4ECDC4, #27ae60)';
        }
        if (autoFillBtn) {
            autoFillBtn.style.opacity = isScriptActive ? '1' : '0.5';
            autoFillBtn.style.cursor = isScriptActive ? 'pointer' : 'not-allowed';
        }
        if (bindEmailBtn) {
            bindEmailBtn.style.opacity = isScriptActive ? '1' : '0.5';
            bindEmailBtn.style.cursor = isScriptActive ? 'pointer' : 'not-allowed';
        }
        if (screenshotBtn) {
            screenshotBtn.style.opacity = isScriptActive ? '1' : '0.5';
            screenshotBtn.style.cursor = isScriptActive ? 'pointer' : 'not-allowed';
        }
    }

    function createScreenshotButton() {
        // Remove existing button if it exists
        const oldBtn = document.getElementById('esball-screenshot-btn');
        if (oldBtn) oldBtn.remove();

        // Create new button
        const screenshotBtn = document.createElement('button');
        screenshotBtn.id = 'esball-screenshot-btn';
        screenshotBtn.innerHTML = isScreenshotTaken ?
            'SS (✅)' : // Green check when screenshot marked as taken
            'SS (❌)';  // Red X when not marked as taken

        screenshotBtn.style.cssText = `
            position: fixed;
            top: 170px;
            right: 20px;
            background: ${isScreenshotTaken ?
                'linear-gradient(45deg, #27ae60, #2ecc71)' :
                'linear-gradient(45deg, #e74c3c, #c0392b)'};
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        // Add click event to mark screenshot as taken
        screenshotBtn.addEventListener('click', function() {
            if (!isScriptActive) return;

            isScreenshotTaken = !isScreenshotTaken; // Toggle the state
            GM_setValue('screenshot_taken', isScreenshotTaken); // Save the state

            // Update the button appearance
            if (isScreenshotTaken) {
                screenshotBtn.innerHTML = 'SS (✅)';
                screenshotBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                createStatusMessage('✅ Screenshot marked as taken!', '#27ae60');
            } else {
                screenshotBtn.innerHTML = 'SS (❌)';
                screenshotBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                createStatusMessage('ℹ️ Screenshot status reset', '#3498db');
            }
        });

        // Add hover effects
        screenshotBtn.addEventListener('mouseenter', () => {
            if (isScriptActive) {
                screenshotBtn.style.transform = 'translateY(-2px)';
                screenshotBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }
        });
        screenshotBtn.addEventListener('mouseleave', () => {
            screenshotBtn.style.transform = 'translateY(0)';
            screenshotBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        document.body.appendChild(screenshotBtn);
        updateControlButtons();
    }

    function createBindEmailButton() {
        // Remove existing button if it exists
        const oldBtn = document.getElementById('esball-bind-email-btn');
        if (oldBtn) oldBtn.remove();

        // Create new button
        const bindEmailBtn = document.createElement('button');
        bindEmailBtn.id = 'esball-bind-email-btn';
        bindEmailBtn.textContent = 'BIND EMAIL';
        bindEmailBtn.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        // Add click event to redirect to account page
        bindEmailBtn.addEventListener('click', () => {
            if (isScriptActive) {
                window.location.href = 'https://www.esball.ph/m/myAccount/index';
            }
        });

        // Add hover effects
        bindEmailBtn.addEventListener('mouseenter', () => {
            if (isScriptActive) {
                bindEmailBtn.style.transform = 'translateY(-2px)';
                bindEmailBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }
        });
        bindEmailBtn.addEventListener('mouseleave', () => {
            bindEmailBtn.style.transform = 'translateY(0)';
            bindEmailBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        document.body.appendChild(bindEmailBtn);
        updateControlButtons();
    }

    function createControlButtons() {
        const oldToggle = document.getElementById('esball-toggle-btn');
        const oldFill = document.getElementById('esball-auto-fill-btn');
        if (oldToggle) oldToggle.remove();
        if (oldFill) oldFill.remove();

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'esball-toggle-btn';
        toggleBtn.textContent = isScriptActive ? '⏹️ Stop Script' : '▶️ Start Script';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isScriptActive ? 'linear-gradient(45deg, #FF6B6B, #C0392B)' : 'linear-gradient(45deg, #4ECDC4, #27ae60)'};
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        const autoFillBtn = document.createElement('button');
        autoFillBtn.id = 'esball-auto-fill-btn';
        autoFillBtn.textContent = window.location.href.includes('register') ?
            '🎯 Auto-Fill Form' : '📧 Fill Account Details';
        autoFillBtn.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        toggleBtn.addEventListener('click', toggleScript);
        autoFillBtn.addEventListener('click', () => {
            if (isScriptActive) {
                if (window.location.href.includes('register')) {
                    fillESballForm();
                } else if (window.location.href.includes('myAccount')) {
                    handleAccountPage();
                }
            }
        });

        [toggleBtn, autoFillBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (isScriptActive || btn.id === 'esball-toggle-btn') {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            });
        });

        document.body.appendChild(toggleBtn);
        document.body.appendChild(autoFillBtn);

        // Create the BIND EMAIL button on all pages
        createBindEmailButton();

        // Create the SCREENSHOT button on all pages
        createScreenshotButton();

        updateControlButtons();
    }

    function waitForForm() {
        if (!isScriptActive) return;

        const checkField = () => document.querySelector('input[name="username"], input[placeholder*="Username"], input[placeholder*="username"]') !== null;

        if (checkField()) {
            console.log('✅ Registration form detected');
            createControlButtons();
            currentTimeout = setTimeout(() => { if (isScriptActive) fillESballForm(); }, 1000);
        } else {
            currentTimeout = setTimeout(waitForForm, 1000);
        }
    }

    function init() {
        console.log('🎯 ESball Auto-Filler loaded for:', window.location.href);
        createControlButtons();

        if (window.location.href.includes('register')) {
            waitForForm();
        } else if (window.location.href.includes('/m/myAccount/index')) {
            handleAccountPage();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'f' && isScriptActive) {
            if (window.location.href.includes('register')) {
                fillESballForm();
            } else if (window.location.href.includes('myAccount')) {
                handleAccountPage();
            }
        }
        if (e.altKey && e.key === 's') toggleScript();
    });

    console.log('🎯 ESball Auto-Filler loaded!');
    console.log('📋 Controls: Alt+F - Fill form, Alt+S - Toggle start/stop');
    console.log('💡 Generating 6-letter names + 2-digit numbers (e.g., Sophia25, Olivia78)');
})();
