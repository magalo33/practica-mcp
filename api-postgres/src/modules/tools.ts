import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Pool } from 'pg';

export function registerTools(server: McpServer) {
 
  server.tool(
    "get-list-person",
    "Tool que obtiene la lista de personas de la base de datos",
    {},
    async () => {
      console.log("Obtener la lista de personas");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const result = await pool.query('SELECT * FROM persona');
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );

  server.tool(
    "get-person-by-name",
    "Tool que obtiene la lista de personas por su nombre de la base de datos",
    {
      nombre: z.string(),
    },
    async ({nombre}) => {
      console.log("Obtener la lista de personas");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const sql = "SELECT * FROM persona WHERE nombre ilike '%"+nombre+"%';";
        console.log(sql, nombre);
        const result = await pool.query(sql);
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );

  server.tool(
    "get-person",
    "Tool que obtiene los datos de una persona por su documento de la base de datos",
    {
      cedula: z.string(),
    },
    async ({cedula}) => {
      console.log("Obtener la lista de personas");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const sql = "SELECT * FROM persona WHERE cedula = '"+cedula+"';";
        console.log(sql, cedula);
        const result = await pool.query(sql);
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );


  server.tool(
    "count-person",
    "Tool que obtiene la cantidad de personas de la base de datos",
    {},
    async () => {
      console.log("Obtener la cantidad de personas");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const result = await pool.query('SELECT count(*) FROM persona');
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );

  server.tool(
    "get-billing",
    "Tool que obtiene las facturas de la base de datos",
    {},
    async () => {
      console.log("Obtener las facturas");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const result = await pool.query('SELECT * FROM factura');
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );

  server.tool(
    "get-billing-by-user",
    "Tool que obtiene las facturas por persona de la base de datos",
    {
      cedula: z.string(),
    },
    async ({cedula}) => {
      console.log("Obtener las facturas por usuario");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });
        const sql = "SELECT * FROM factura WHERE cedula = '"+cedula+"';";
        console.log(sql, cedula); // Para depuración
        const result = await pool.query(sql);  
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  );

  server.tool(
    "get-sum-billing-by-user",
    "Tool que obtiene el total facturado a una persona de la base de datos",
    {
      cedula: z.string(),
    },
    async ({cedula}) => {
      console.log("Obtener las facturas por usuario");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });

        const sql = "SELECT sum(neto) FROM factura WHERE cedula = '"+cedula+"';";
        console.log(sql, cedula); 
        const result = await pool.query(sql);

        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }

    }
  ); 


  server.tool(
    "get-billing-by-date",
    "Tool que obtiene las facturas por fecha de la base de datos",
    {
      fecha: z.string(),
    },
    async ({fecha}) => {
      console.log("Obtener las facturas por fecha");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });

        const sql = "SELECT * FROM factura WHERE fecha = '"+fecha+"';";
        console.log(sql, fecha); // Para depuración
        const result = await pool.query(sql);
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }
    }
  );


  server.tool(
    "get-billing-by-date-user",
    "Tool que obtiene las facturas por fecha de una persona(por su cédula) de la base de datos",
    {
      fecha: z.string(),
      cedula: z.string(),
    },
    async ({fecha,cedula}) => {
      console.log("Obtener las facturas por fecha");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });

        const sql = "SELECT * FROM factura WHERE fecha = '"+fecha+"' AND cedula = '"+cedula+"';";
        console.log(sql); // Para depuración
        const result = await pool.query(sql);
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }
    }
  );

  //tool que obtiene las facturas de una persona por su cedula entre 2 fechas
  server.tool(
    "get-billing-by-date-range",
    "Tool que obtiene las facturas por fecha de una persona(por su cédula) de la base de datos",
    {
      fecha1: z.string(),
      fecha2: z.string(),
      cedula: z.string(),
    },
    async ({fecha1,fecha2,cedula}) => {   
      console.log("Obtener las facturas por fecha de una persona");
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        });

        const sql = "SELECT * FROM factura WHERE fecha BETWEEN '"+fecha1+"' AND '"+fecha2+"' AND cedula = '"+cedula+"';";
        console.log(sql);
        const result = await pool.query(sql);
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(result.rows)}` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Result: ${JSON.stringify(error)}` }],
        };
      }
    }
  );

}