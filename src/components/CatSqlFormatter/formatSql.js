import { format } from 'sql-formatter';

export function formatSql(sql) {
  try {
    return format(sql);
  } catch (ex) {
    console.log(ex);
    return sql;
  }
}
