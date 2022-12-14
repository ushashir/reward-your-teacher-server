import { endOfDay, startOfDay } from 'date-fns';
import {
  FilterQuery,
  Model,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  SortOrder,
} from 'mongoose';

export const dateRangeFilter = (minDate: Date, maxDate: Date, key: string) => {
  if (minDate && !maxDate) {
    return {
      [key]: {
        $gte: startOfDay(minDate),
      },
    };
  }

  if (maxDate && !minDate) {
    return {
      [key]: {
        $lte: endOfDay(maxDate),
      },
    };
  }

  if (minDate && maxDate) {
    return {
      [key]: {
        $gte: startOfDay(minDate),
        $lte: endOfDay(maxDate),
      },
    };
  }
};

type PaginateAndSort<T> = {
  model: Model<T>;
  sort?: string;
  filters?: FilterQuery<T>;
  page?: number;
  limit?: number;
  projection?: ProjectionType<T> | null | undefined;
  options?: QueryOptions<T> | null | undefined;
  populate?: PopulateOptions | (PopulateOptions | string)[];
};

export const paginateAndSort = async <T>(params: PaginateAndSort<T>) => {
  const {
    model,
    sort = '',
    filters = {},
    page = 1,
    limit = 10,
    projection = null,
    options = null,
    populate = null,
  } = params;

  const query = params.model.find(filters, projection, options);

  if (populate) {
    query.populate(populate);
  }

  if (sort) {
    const [key, order] = sort.split(',');

    query.sort({ [key]: order as SortOrder });
  }

  const total = await model.countDocuments(filters);

  const lastPage = Math.ceil(total / limit);

  const data = await query
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return { data, total, page, lastPage };
};
