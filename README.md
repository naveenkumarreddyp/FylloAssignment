Project Details

This application is built using React with Vite as the build tool. It consists of two primary pages: Analytics and Products, utilizing dummy data stored in a file named Data.js located in the src folder

Analytics Page

The Analytics page is divided into two main sections, each featuring graphical representations:

1. Section 1: Top Products Bar Charts

    Displays bar charts for:
        Top 5 Required Products: 
            Products with the highest demand.
        Top 5 Least Available Products: 
            Products with the lowest availability

2. Section 2: Requirement vs Availability

    Includes a visual comparison of Requirement vs Availability for products
    Users can toggle between:
        A Bar Chart
        A Line Graph
    A dropdown menu is provided to switch between these two visualizations

3. Filters:

    The top of the page includes dropdown filters for:
        Year
        Month
        State


Products Page

The Products page showcases a detailed table listing all products with the following features:

1. Table Structure:

    Columns include:
        Year
        Month
        Product Name
        Requirement (in metric tons)
        Availability (in metric tons)


2. Sorting and Searching:

    Sorting:
        Supports sorting for all columns
        Month sorting is based on chronological order (e.g., January, February, etc.) instead of alphabetical order
    Search Filters:
        Allows filtering for Requirement and Availability columns using operators like >, <, and =


3. Pagination:

    Includes pagination controls at the bottom of the table
    Users can customize the number of entries displayed per page



How to Run the Application

    Install Dependencies: Run the following command to install all required packages:

        npm install

    Start Development Server: Use the following command to start the application in development mode:

        npm run dev

    Build the Application: For production, build the application using:
    
        npm run build